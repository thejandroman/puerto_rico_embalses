import { render, screen } from '@testing-library/react'
import MyLayout from '../components/MyLayout'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('MyLayout', () => {
  it('renders header navigation', () => {
    render(<MyLayout><div>Content</div></MyLayout>)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<MyLayout><div>Test Content</div></MyLayout>)
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders nested components', () => {
    render(
      <MyLayout>
        <h1>Title</h1>
        <p>Paragraph</p>
      </MyLayout>
    )
    
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
  })

  it('has container divs', () => {
    const { container } = render(<MyLayout><div>Content</div></MyLayout>)
    
    const containers = container.querySelectorAll('.container')
    expect(containers.length).toBe(2)
  })
})
