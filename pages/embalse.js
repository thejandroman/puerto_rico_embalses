import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
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

  const res = await fetch(`//waterservices.usgs.gov/nwis/iv/?format=json&sites=${id}&period=P30D&parameterCd=62616&siteStatus=all`, {mode: 'cors'})
  const data = await res.json()

  return myEmbalses.processUsgsEmbalses(data)[0]
}

export default Embalse
