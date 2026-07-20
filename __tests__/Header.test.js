import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Map')).toBeInTheDocument()
    expect(screen.getByText('Table')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('has correct href for Home link', () => {
    render(<Header />)
    
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('has correct href for Map link', () => {
    render(<Header />)
    
    const mapLink = screen.getByText('Map')
    expect(mapLink).toHaveAttribute('href', '/map')
  })

  it('has correct href for Table link', () => {
    render(<Header />)
    
    const tableLink = screen.getByText('Table')
    expect(tableLink).toHaveAttribute('href', '/table')
  })

  it('has correct href for About link', () => {
    render(<Header />)
    
    const aboutLink = screen.getByText('About')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('renders as a nav list', () => {
    render(<Header />)
    
    const nav = screen.getByRole('list')
    expect(nav).toHaveClass('nav')
  })
})
