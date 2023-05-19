import SearchButton from '../components/SearchButton'
import { getImageUrl } from '../helpers/urlHelper'
import { GetBlockComponent } from './BlockPage'

type LandingPageProps = {
    content: any,
}

function LandingPage({ content }: LandingPageProps) {
    return (
        <div>
            <nav className="Page-container PageHeader NavBar">
                <div className="nav-table">
                    <div className="nav-table-row">
                        <div className="nav-table-cell">
                            <button className="Button buy-ticket-button">{content?.BuyTicketBlock?.Heading}</button>
                        </div>
                        <div className="nav-table-cell search-button-block">
                            <SearchButton />
                        </div>
                    </div>
                </div>               
            </nav>
            <section className="Hero">
                <div className="Hero-content Page-container">
                    <h1 data-epi-edit="Title">{content?.Title}</h1>
                    <h5 data-epi-edit="Subtitle">{content?.Subtitle}</h5>
                </div>
                <div className="Hero-image" style={{ backgroundImage: `url(${getImageUrl(content?.HeroImage)})` }}>
                </div>
            </section>
            <a href={content.ArtistsLink?.Expanded?.RelativePath} className="EPiLink Button modal-default-button landing-page-button">{content.ArtistsLink?.Expanded?.Name}</a>
            <main className='Page-container'>
                <div>
                    <section data-epi-edit="MainContentArea" className='Grid Grid--alignMiddle Grid--gutterA ContentArea'>
                        {content?.MainContentArea?.map((mainContentAreaItem: any, mainContentAreaItemIdx: number) => {
                            return (
                                (() => {
                                    const contentItem = mainContentAreaItem?.ContentLink?.Expanded
                                    if (contentItem?.__typename === "ImageFile") {
                                        return (
                                            <div className="Grid-cell u-md-size1of2" key={mainContentAreaItemIdx}>
                                                <div className="Page-container ImageFile">
                                                    <div className="Grid Grid--alignMiddle Grid--gutterA">
                                                        <div className="Grid-cell">
                                                            <img className="ConditionalImage" src={getImageUrl(contentItem?.Url)} alt={contentItem?.Url ?? ''} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={mainContentAreaItemIdx}>
                                            {GetBlockComponent(contentItem)}
                                        </div>
                                    )
                                })()
                            )
                        })}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LandingPage;