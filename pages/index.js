import Layout from '../components/MyLayout.js'
import EmbalsesApi from '../components/EmbalsesApi.js'
import Niveles from '../components/Niveles.js'
import { useLanguage } from '../context/LanguageContext'

const Index = (props) => {
  const { t } = useLanguage()

  return (
    <Layout>
      <h1>{t('home.title')}</h1>
      <div className='row'>
        <div className='col'>
          <Niveles embalses={props.embalses} />
        </div>
      </div>
    </Layout>
  )
}

Index.getInitialProps = async function () {
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

export default Index
