type BlockProps = {
    content: any
}

function BuyTicketBlock({ content }: BlockProps) {
    return (
        <div className="buyTickets-container">
            <h3>{content.Heading}</h3>
            <div>
                <label htmlFor="tickets-email">
                    {content.Message}
                    <input id="tickets-email" type="email" />
                </label>
            </div>
        </div>
    )
}

export default BuyTicketBlock;