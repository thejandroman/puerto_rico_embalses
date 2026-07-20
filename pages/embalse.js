import Layout from '../components/MyLayout.js'
import EmbalsesApi from '../components/EmbalsesApi.js'

const Embalse = props => (
  <Layout>
    <h1>{props.commonName}</h1>
    <h3>{props.siteName}</h3>
  </Layout>
)

Embalse.getInitialProps = async function (req) {
  const { id } = req.query
  const myEmbalses = new EmbalsesApi()

  try {
    const res = await fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}&period=P30D&parameterCd=72376&siteStatus=all`, {mode: 'cors'})
    
    if (!res.ok) {
      console.error('USGS API error:', res.status, res.statusText)
      return { commonName: 'Unknown', siteName: 'Data unavailable' }
    }
    
    const data = await res.json()
    const embalses = myEmbalses.processUsgsEmbalses(data)
    return embalses[0] || { commonName: 'Unknown', siteName: 'Data unavailable' }
  } catch (error) {
    console.error('Failed to fetch USGS data:', error.message)
    return { commonName: 'Unknown', siteName: 'Data unavailable' }
  }
}

export default Embalse
