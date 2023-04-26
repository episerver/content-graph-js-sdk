import Header from '../../components/Header'
import { getImageUrl } from '../../lib/urlHelper'
import { getArtistContainerPage } from '@/lib/getArtistContainerPage'
import { ArtistContainerPageProps } from '@/models/Props'
import Link from 'next/link'

export const getStaticProps = async () => {
    const { error, content } = await getArtistContainerPage('', '/en/artists');
    return {
        props: { error, content }
    }
}

export default function Artists(props: ArtistContainerPageProps) {
    const { error, content } = props
    if (error) return <pre>{JSON.stringify(error)}</pre>
    return (
        <div className="App">
            <Header />
            {
                content.ArtistContainerPage?.items?.map((content: any, artistContainerPageIdx: number) => {
                    return (
                        <div className="ArtistContainerPage" key={artistContainerPageIdx}>
                            <nav className="Page-container PageHeader NavBar">
                                <div className="backButton">
                                    <a href={content.ParentLink?.Url} className="EPiLink">
                                        <span></span>
                                    </a>
                                </div>
                            </nav>
                            <div className="Page-container">
                                <div className="top gutter">
                                    <h1 data-epi-edit="Name">{content?.Name}</h1>
                                </div>
                                <div className="list">
                                    <h3>&nbsp;</h3>
                                    {content.artists?.ArtistDetailsPage?.items?.map((artistDetailsPage: any, artistDetailsPageIdx: number) => {
                                        return (
                                            <div key={artistDetailsPageIdx}>
                                                <Link href={artistDetailsPage?.RelativePath ?? ''} className="EPiLink">
                                                    <div className="card">
                                                        <div className="round"><img className="ConditionalImage"
                                                            src={getImageUrl(artistDetailsPage?.ArtistPhoto)}
                                                            alt={artistDetailsPage?.ArtistName ?? ''} />
                                                        </div>
                                                        <div className="info">
                                                            <p>{artistDetailsPage?.ArtistName}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                    <h3>&nbsp;</h3>
                                </div>
                            </div >
                            <footer>
                                <div className="FooterBottom">
                                    <h6>&copy; Music Festival 2020</h6>
                                </div>
                            </footer>
                        </div >
                    )
                })
            }
        </div>
    )
}
