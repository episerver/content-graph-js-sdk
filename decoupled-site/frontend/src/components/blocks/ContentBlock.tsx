import parse from 'html-react-parser'
import { getImageUrl } from '../../helpers/urlHelper'

type BlockProps = {
    content: any
}

function ContentBlock({ content }: BlockProps) {
    return (
        <div className="Grid-cell">
            <div className="Page-container ContentBlock">
                <div className="Grid Grid--alignMiddle Grid--gutterA">
                    {(() => {
                        if (content?.ImageAlignment === "Right") {
                            return (
                                <>
                                    <div className="Grid-cell u-md-size1of2" >
                                        <h2 data-epi-edit="Title">{content?.Title}</h2>
                                        <div data-epi-edit="Content">
                                            {parse(content?.Content ?? '')}
                                        </div>
                                    </div>
                                    <div className="Grid-cell u-md-size1of2" >
                                        <img className="ConditionalImage" data-epi-edit="Image" src={getImageUrl(content?.Image)} alt={content?.Title} />
                                    </div>
                                </>
                            )
                        }

                        return (
                            <>
                                <div className="Grid-cell u-md-size1of2" >
                                    <img className="ConditionalImage" data-epi-edit="Image" src={getImageUrl(content?.Image)} alt={content?.Title} />
                                </div>
                                <div className="Grid-cell u-md-size1of2" >
                                    <h2 data-epi-edit="Title">{content?.Title}</h2>
                                    <div data-epi-edit="Content">
                                        {parse(content?.Content ?? '')}
                                    </div>
                                </div>
                            </>
                        )
                    }
                    )()}
                </div>
            </div>
        </div>
    )
}

export default ContentBlock;