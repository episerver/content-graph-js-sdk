import { getImageUrl } from '../helpers/urlHelper'

type ArtistContainerPageProps = {
    content: any
}

function ArtistContainerPage({ content }: ArtistContainerPageProps) {
    return (
        <div className="ArtistContainerPage">
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
                                <a href={artistDetailsPage?.RelativePath ?? ''} className="EPiLink">
                                    <div className="card">
                                        <div className="round"><img className="ConditionalImage"
                                            src={getImageUrl(artistDetailsPage?.ArtistPhoto)}
                                            alt={artistDetailsPage?.ArtistName ?? ''} />
                                        </div>
                                        <div className="info">
                                            <p>{artistDetailsPage?.ArtistName}</p>
                                        </div>
                                    </div>
                                </a>
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
}

export default ArtistContainerPage;