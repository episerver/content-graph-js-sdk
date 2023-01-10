type BlockProps = {
    content: any
}

function GenericBlock({ content }: BlockProps) {
    return (
        <div className="Page-container GenericBlock">
            <div className="Grid Grid--alignMiddle Grid--gutterA">
                <div className="Grid-cell">
                    <p>Could not load { content.Name } react component.</p>
                </div>
            </div>
        </div>
    )
}

export default GenericBlock;