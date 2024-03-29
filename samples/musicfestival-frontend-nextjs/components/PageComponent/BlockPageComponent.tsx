import BuyTicketBlock from '../blocks/BuyTicketBlock'
import ContentBlock from '../blocks/ContentBlock'
import GenericBlock from '../blocks/GenericBlock'

type ArtistDetailsPageProps = {
    content: any
}

export function GetBlockComponent(content: any) {
    if (content?.__typename == "ContentBlock") {
        return <ContentBlock content={content} />
    }

    if (content?.__typename == "GenericBlock") {
        return <GenericBlock content={content} />
    }

    if (content?.__typename == "BuyTicketBlock") {
        return <BuyTicketBlock content={content} />
    }

    return <GenericBlock content={content} />
}

export default function BlockPage({ content }: ArtistDetailsPageProps) {
    return (
        <div className="preview-wrapper">
            <section className="Grid Preview" v-if="modelLoaded">
                <div className="Grid-cell u-border">
                    <h5>Full</h5>
                </div>
                <div className="Grid-cell u-md-sizeFull">
                    {GetBlockComponent(content)}
                </div>

                <div className="Grid-cell u-border">
                    <h5>Wide</h5>
                </div>
                <div className="Grid-cell u-md-size2of3">
                    {GetBlockComponent(content)}
                </div>

                <div className="Grid-cell u-border">
                    <h5>Half</h5>
                </div>
                <div className="Grid-cell u-md-size1of2">
                    {GetBlockComponent(content)}
                </div>

                <div className="Grid-cell u-border">
                    <h5>Narrow</h5>
                </div>
                <div className="Grid-cell u-md-size1of3">
                    {GetBlockComponent(content)}
                </div>
            </section>
        </div>
    )
}