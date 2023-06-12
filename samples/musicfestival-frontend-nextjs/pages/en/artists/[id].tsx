import Header from '../../../components/Header'
import { getImageUrl } from '../../../lib/urlHelper'
import { getArtistContainerPage } from '@/lib/getArtistContainerPage'
import { ArtistDetailsPageProps } from '@/models/Props'
import parse from 'html-react-parser'
import { getArtistDetailPage } from '@/lib/getArtistDetailPage'
import Link from 'next/link'


export async function getStaticPaths() {
    const { error, content } = await getArtistContainerPage('', '/en/artists');

    const paths = content?.ArtistContainerPage?.items?.map(item =>
         item?.artists?.ArtistDetailsPage?.items?.map(artist => {
                return {params: { id: artist?.RelativePath?.substring((item?.RelativePath?.length || 0) + 1, artist.RelativePath.length) ?? '' }}
        })
    ).flat()
  
    return { paths, fallback: false }
  }

  export const getStaticProps = async (context: any) => {
    const { error, content } = await getArtistDetailPage('', `/en/artists/${context.params.id}`);
    return {
        props: { error, content }
    }
}

export default function ArtistDetailsPage({ error, content }: ArtistDetailsPageProps) {
    if (error) return <pre>{JSON.stringify(error)}</pre>
    const artist = content.ArtistDetailsPage?.items?.at(0)
    return (
        <div className="App">
            <Header />
            <div className="ArtistDetailsPage">
                <nav className="Page-container PageHeader NavBar">
                    <div className="backButton">
                        <Link href={artist?.ParentLink?.Url || ''} className="EPiLink">
                            <span></span>
                        </Link>
                    </div>
                </nav>
                <div className="Page-container u-posRelative">
                    <div className="artistImage">
                        {(() => {
                            if (artist?.ArtistPhoto && artist.ArtistPhoto.length > 0) {
                                return (
                                    <img src={getImageUrl(artist?.ArtistPhoto)}
                                        className="ConditionalImage"
                                        alt={artist?.ArtistName ?? ''}
                                    />
                                )
                            }
                        })()}
                    </div>
                    <div className='top'>
                        <h1 data-epi-edit="ArtistName">{artist?.ArtistName}</h1>
                    </div>
                    <div className="artist-information">
                        <p data-epi-edit="StageName">{artist?.StageName}</p>
                        <p><span data-epi-edit="PerformanceStartTime">{artist?.PerformanceStartTime}</span> - <span data-epi-edit="PerformanceEndTime">{artist?.PerformanceEndTime}</span></p>
                    </div>
                    <div className="artist-description" data-epi-edit="ArtistDescription">
                        {parse(artist?.ArtistDescription ?? '')}
                    </div>
                </div>
                <footer>
                    <div className="FooterBottom">
                        <h6>&copy; Music Festival 2020</h6>
                    </div>
                </footer>
            </div>
        </div>
    )
}