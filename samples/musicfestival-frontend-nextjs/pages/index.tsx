import Footer from "../components/Footer"
import Header from "../components/Header"
import BlockPage from "../components/PageComponent/BlockPageComponent"
import LandingPage from "../components/PageComponent/LandingPageComponent"
import { StartPageProps } from "@/models/Props";
import { getStartPage } from "@/lib/getStartPage";

export const getStaticProps = async () => {
    const { error, content } = await getStartPage('', '/');
    return {
        props: { error, content }
    }
}

const Home = (props: StartPageProps) => {
    const { error, content } = props
    if (error) return <p>{JSON.stringify(error)}</p>
    
    return (
        <div className="App">
            <Header />
            <div className='LandingPage'>
                {
                    content?.Content?.items?.map((content, idx) => {
                        if (content?.__typename === 'LandingPage') {                            
                            return (
                                <div key={idx}>
                                    <LandingPage content={content} key={idx} />
                                    <Footer content={content} />
                                </div>
                            )
                        }
                        return <BlockPage content={content} key={idx} />
                    })
                }
            </div>
        </div>
    )
}

export default Home