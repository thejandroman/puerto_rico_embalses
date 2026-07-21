import FullscreenLayout from '../components/FullscreenLayout.js'
import EmbalsesApi from '../components/EmbalsesApi.js'
import dynamic from 'next/dynamic'

const EmbalsesMap = dynamic(() => import('../components/EmbalsesMap.js'), {ssr: false})

const MapPage = (props) => (
  <FullscreenLayout>
    <EmbalsesMap embalses={props.embalses} />
  </FullscreenLayout>
)

MapPage.getInitialProps = async function () {
  const myEmbalses = new EmbalsesApi()
  const sites = myEmbalses.ids.join(',')

  try {
    const res = await fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${sites}&parameterCd=72376&siteStatus=all`, {mode: 'cors'})
    
    if (!res.ok) {
      console.error('USGS API error:', res.status, res.statusText)
      return { embalses: [] }
    }
    
    const data = await res.json()
    return { embalses: myEmbalses.processUsgsEmbalses(data) }
  } catch (error) {
    console.error('Failed to fetch USGS data:', error.message)
    return { embalses: [] }
  }
}

export default MapPage
