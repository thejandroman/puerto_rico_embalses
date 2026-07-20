import Layout from '../components/MyLayout.js'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t } = useLanguage()

  return (
    <Layout>
      <h1>{t('about.title')}</h1>
      <p>{t('about.description')}</p>
    </Layout>
  )
}

export default About
