import { GetBlockComponent } from './PageComponent/BlockPageComponent'

type FooterProps = {
    content: any
}

function Footer({ content }: FooterProps) {
    return (
        <footer>
            <div>
                <section className="Grid Grid--alignMiddle Grid--gutterA ContentArea" data-epi-edit="FooterContentArea">
                    <div className="Grid-cell u-md-sizeFull">
                        {content?.FooterContentArea?.map((mainContentAreaItem: any, mainContentAreaItemIdx: number) => {
                            return (
                                <div key={mainContentAreaItemIdx}>
                                    {GetBlockComponent(mainContentAreaItem.ContentLink?.Expanded)}
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
            <div className="FooterBottom">
                <h6>&copy; Music Festival 2020</h6>
            </div>
        </footer>
    )
}

export default Footer;