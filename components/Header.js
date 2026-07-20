import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

const Header = () => {
  const { t, locale, toggleLanguage } = useLanguage()

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
      <div className='container'>
        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
          <li className='nav-item'>
            <Link href='/' className='nav-link'>{t('common.home')}</Link>
          </li>
          <li className='nav-item'>
            <Link href='/map' className='nav-link'>{t('common.map')}</Link>
          </li>
          <li className='nav-item'>
            <Link href='/table' className='nav-link'>{t('common.table')}</Link>
          </li>
          <li className='nav-item'>
            <Link href='/about' className='nav-link'>{t('common.about')}</Link>
          </li>
        </ul>
        <button 
          className='btn btn-outline-secondary btn-sm' 
          onClick={toggleLanguage}
        >
          {locale === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  )
}

export default Header
