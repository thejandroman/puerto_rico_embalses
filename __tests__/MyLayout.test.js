import { render, screen } from '@testing-library/react'
import MyLayout from '../components/MyLayout'
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

describe('MyLayout', () => {
  it('renders header navigation', () => {
    renderWithLanguage(<MyLayout><div>Content</div></MyLayout>)
    
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Acerca de')).toBeInTheDocument()
  })

  it('renders children content', () => {
    renderWithLanguage(<MyLayout><div>Test Content</div></MyLayout>)
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders nested components', () => {
    renderWithLanguage(
      <MyLayout>
        <h1>Title</h1>
        <p>Paragraph</p>
      </MyLayout>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
  })

  it('has container divs', () => {
    const { container } = renderWithLanguage(<MyLayout><div>Content</div></MyLayout>)
    
    const containers = container.querySelectorAll('.container')
    expect(containers.length).toBeGreaterThanOrEqual(2)
  })
})
