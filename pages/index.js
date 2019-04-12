import Layout from '../components/MyLayout.js'
import EmbalsesApi from '../components/EmbalsesApi.js'
import EmbalsesTable from '../components/EmbalsesTable.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import dynamic from 'next/dynamic'

const EmbalsesMap = dynamic(import('../components/EmbalsesMap.js'), {ssr: false})

const Index = (props) => (
  <Layout>
    <h1>Embalses de Puerto Rico</h1>
    <EmbalsesMap embalses={props.embalses} />
    <div className='row'>
      <div className='col'>
        <EmbalsesTable embalses={props.embalses} />
      </div>
    </div>
  </Layout>
)

Index.getInitialProps = async function () {
  const myEmbalses = new EmbalsesApi()
  const sites = myEmbalses.ids.join(',')

  const res = await fetch(`//waterservices.usgs.gov/nwis/iv/?format=json&sites=${sites}&parameterCd=62616&siteStatus=all`, {mode: 'cors'})
  const data = await res.json()

  return {
    embalses: myEmbalses.processUsgsEmbalses(data)
  }
}

export default Index
