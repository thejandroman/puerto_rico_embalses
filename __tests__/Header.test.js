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
    
    const homeLink = screen.getByText('Home')
    const aboutLink = screen.getByText('About')
    
    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('has correct href for Home link', () => {
    render(<Header />)
    
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveAttribute('href', '/')
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
