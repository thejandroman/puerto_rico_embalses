import Layout from '../components/MyLayout.js'
import { useLanguage } from '../context/LanguageContext'

const alertColors = [
  { key: 'desborde', color: '#9500D3', bgColor: 'rgba(149, 0, 211, 0.2)' },
  { key: 'seguridad', color: '#208B22', bgColor: 'rgba(32, 139, 34, 0.2)' },
  { key: 'observacion', color: '#4269E1', bgColor: 'rgba(66, 105, 225, 0.2)' },
  { key: 'ajustesOperacionales', color: '#FFFF04', bgColor: 'rgba(255, 255, 4, 0.2)' },
  { key: 'control', color: '#FFA502', bgColor: 'rgba(255, 165, 2, 0.2)' },
  { key: 'fueraDeServicio', color: '#C00100', bgColor: 'rgba(192, 1, 0, 0.2)' },
]

const About = () => {
  const { t } = useLanguage()

  return (
    <Layout>
      <h1>{t('about.title')}</h1>
      <p>{t('about.description')}</p>
      
      <h2 className='mt-4'>{t('about.colorLegend')}</h2>
      <p>{t('about.colorLegendDescription')}</p>
      
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th style={{ width: '150px' }}>{t('about.color')}</th>
              <th>{t('about.alertLevel')}</th>
              <th>{t('about.description')}</th>
            </tr>
          </thead>
          <tbody>
            {alertColors.map(({ key, color, bgColor }) => (
              <tr key={key}>
                <td>
                  <span 
                    style={{ 
                      display: 'inline-block',
                      width: '24px',
                      height: '24px',
                      backgroundColor: bgColor,
                      borderColor: color,
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderRadius: '4px',
                      verticalAlign: 'middle',
                      marginRight: '8px'
                    }}
                  />
                  <code>{color}</code>
                </td>
                <td>{t(`alerts.${key}`)}</td>
                <td>{t(`alertDescriptions.${key}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default About
