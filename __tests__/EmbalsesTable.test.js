import { render, screen } from '@testing-library/react'
import EmbalsesTable from '../components/EmbalsesTable'

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

const mockEmbalses = [
  {
    id: 50059000,
    commonName: 'Carraizo',
    currentAlert: 'observacion',
    values: [
      { value: '38.5', dateTime: '2024-01-01T00:00:00Z' }
    ]
  },
  {
    id: 50045000,
    commonName: 'La Plata',
    currentAlert: 'seguridad',
    values: [
      { value: '48.2', dateTime: '2024-01-01T12:00:00Z' }
    ]
  }
]

describe('EmbalsesTable', () => {
  it('renders table headers', () => {
    render(<EmbalsesTable embalses={[]} />)
    
    expect(screen.getByText('Embalse')).toBeInTheDocument()
    expect(screen.getByText('Last Updated')).toBeInTheDocument()
    expect(screen.getByText('Current Alert')).toBeInTheDocument()
    expect(screen.getByText('Current Level (meters)')).toBeInTheDocument()
  })

  it('renders embalse rows', () => {
    render(<EmbalsesTable embalses={mockEmbalses} />)
    
    expect(screen.getByText('Carraizo')).toBeInTheDocument()
    expect(screen.getByText('La Plata')).toBeInTheDocument()
  })

  it('renders current alert levels', () => {
    render(<EmbalsesTable embalses={mockEmbalses} />)
    
    expect(screen.getByText('Observacion')).toBeInTheDocument()
    expect(screen.getByText('Seguridad')).toBeInTheDocument()
  })

  it('renders current values', () => {
    render(<EmbalsesTable embalses={mockEmbalses} />)
    
    expect(screen.getByText('38.5')).toBeInTheDocument()
    expect(screen.getByText('48.2')).toBeInTheDocument()
  })

  it('links to embalse detail page', () => {
    render(<EmbalsesTable embalses={mockEmbalses} />)
    
    const carraizoLink = screen.getByText('Carraizo')
    expect(carraizoLink).toHaveAttribute('href', '/embalse?id=50059000')
  })

  it('renders empty table body when no embalses', () => {
    render(<EmbalsesTable embalses={[]} />)
    
    const rows = screen.queryAllByRole('row')
    // Only header row
    expect(rows).toHaveLength(1)
  })
})
