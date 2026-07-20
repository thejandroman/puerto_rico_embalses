import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import { LanguageProvider } from '../context/LanguageContext'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

const renderWithLanguage = (ui) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  )
}

describe('Header', () => {
  it('renders navigation links in Spanish (default)', () => {
    renderWithLanguage(<Header />)
    
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Mapa')).toBeInTheDocument()
    expect(screen.getByText('Tabla')).toBeInTheDocument()
    expect(screen.getByText('Acerca de')).toBeInTheDocument()
  })

  it('has correct href for Home link', () => {
    renderWithLanguage(<Header />)
    
    const homeLink = screen.getByText('Inicio')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('has correct href for Map link', () => {
    renderWithLanguage(<Header />)
    
    const mapLink = screen.getByText('Mapa')
    expect(mapLink).toHaveAttribute('href', '/map')
  })

  it('has correct href for Table link', () => {
    renderWithLanguage(<Header />)
    
    const tableLink = screen.getByText('Tabla')
    expect(tableLink).toHaveAttribute('href', '/table')
  })

  it('has correct href for About link', () => {
    renderWithLanguage(<Header />)
    
    const aboutLink = screen.getByText('Acerca de')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('renders language toggle button', () => {
    renderWithLanguage(<Header />)
    
    expect(screen.getByText('EN')).toBeInTheDocument()
  })
})
