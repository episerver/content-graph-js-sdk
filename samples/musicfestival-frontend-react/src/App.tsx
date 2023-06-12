import { StartQuery, useStartQuery } from './generated';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ArtistContainerPage from './pages/ArtistContainerPage';
import ArtistDetailsPage from './pages/ArtistDetailsPage';
import authService from './authService';
import { useState } from 'react';
import { isEditOrPreviewMode } from './helpers/urlHelper'
import './App.css';
import Footer from './components/Footer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ContentSavedMessage } from './models/ContentSavedMessage';
import { subcribeContentSavedEvent } from './helpers/contentSavedEvent';
import { generateGQLQueryVars, updateStartQueryCache } from './helpers/queryCacheHelper';
import { BlockPage } from './pages/BlockPage';

let previousSavedMessage: any = null;
const singleKeyUrl = process.env.REACT_APP_CONTENT_GRAPH_GATEWAY_URL as string
const hmacKeyUrl = process.env.REACT_APP_CG_PROXY_URL as string

const App = () => {
    const queryClient = useQueryClient();
    const [token, setToken] = useState("")
    let data: StartQuery | undefined = undefined
    let variables: any
    let headers = {}
    let url = singleKeyUrl
    const modeEdit = isEditOrPreviewMode()

    const { mutate } = useMutation((obj: any) => obj, {
        onSuccess: (message: ContentSavedMessage) => {
            if (previousSavedMessage !== message) {
                previousSavedMessage = message;
                updateStartQueryCache(queryClient, data, variables, message)
            }
        }
    });

    authService.getAccessToken().then((_token) => {
        _token && setToken(_token)
        modeEdit && !_token && !data && authService.login()
    })

    variables = generateGQLQueryVars(token, window.location.pathname)
    if (modeEdit) {
        if (token) {
            headers = { 'Authorization': 'Bearer ' + token };
        }
        url = hmacKeyUrl
        subcribeContentSavedEvent((message: any) => mutate(message))
    }

    const { data: queryData } = useStartQuery({ endpoint: url, fetchParams: { headers: headers } }, variables, { staleTime: 2000, enabled: !modeEdit || !!token });
    data = queryData
    
    if (!data) {
        return (
            <div className="App">
                Loading
            </div>
        );
    }

    return (
        <div className="App">
            <Header />
            <div className='LandingPage'>
                {
                    data?.Content?.items?.map((content, idx) => {
                        if (content?.__typename === 'LandingPage') {
                            return (
                                <div key={idx}>
                                    <LandingPage content={content} key={idx} />
                                    <Footer content={content} />
                                </div>
                            )
                        }
                        else if (content?.__typename === 'ArtistContainerPage') {
                            return (
                                <ArtistContainerPage content={content} key={idx} />
                            )
                        }
                        else if (content?.__typename === 'ArtistDetailsPage') {
                            return (
                                <ArtistDetailsPage content={content} key={idx} />
                            )
                        }
                        return <BlockPage content={content} key={idx} />
                    })
                }
            </div>
        </div>
    );
};

export default App;