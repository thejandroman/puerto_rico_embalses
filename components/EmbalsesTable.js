import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const EmbalseRow = ({ embalse }) => {
  const { t } = useLanguage()
  
  return (
    <tr>
      <td>
        <Link href={`/embalse?id=${embalse.id}`}>
          {embalse.commonName}
        </Link>
      </td>
      <td>{new Date(embalse.values[0].dateTime).toString()}</td>
      <td>{t(`alerts.${embalse.currentAlert}`)}</td>
      <td>{embalse.values[0].value}</td>
    </tr>
  )
}

const EmbalsesTable = ({ embalses }) => {
  const { t } = useLanguage()

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>{t('table.embalse')}</th>
          <th scope='col'>{t('table.lastUpdated')}</th>
          <th scope='col'>{t('table.currentAlert')}</th>
          <th scope='col'>{t('table.currentLevel')}</th>
        </tr>
      </thead>
      <tbody>
        {embalses.map(embalse => (
          <EmbalseRow embalse={embalse} key={embalse.id} />
        ))}
      </tbody>
    </table>
  )
}

export default EmbalsesTable
