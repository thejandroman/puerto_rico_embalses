import { render, screen } from '@testing-library/react'
import EmbalsesMap from '../components/EmbalsesMap'

// Mock react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, center, zoom }) => (
    <div data-testid='map-container' data-center={JSON.stringify(center)} data-zoom={zoom}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid='tile-layer' />,
  Marker: ({ children, position, icon }) => (
    <div data-testid='marker' data-position={JSON.stringify(position)}>
      {children}
    </div>
  ),
  Popup: ({ children }) => <div data-testid='popup'>{children}</div>
}))

// Mock leaflet icon
jest.mock('leaflet', () => ({
  icon: jest.fn(() => ({ iconUrl: 'mock-icon.png' }))
}))

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
    geoLocation: [18.3258, -66.0086],
    values: [{ value: '38.5' }]
  },
  {
    id: 50045000,
    commonName: 'La Plata',
    currentAlert: 'seguridad',
    geoLocation: [18.4167, -66.2167],
    values: [{ value: '48.2' }]
  }
]

describe('EmbalsesMap', () => {
  it('renders the map container', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })

  it('renders with correct center position', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    const map = screen.getByTestId('map-container')
    const center = JSON.parse(map.dataset.center)
    
    expect(center).toEqual([18.2256014, -66.3940944])
  })

  it('renders with zoom level 9', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    const map = screen.getByTestId('map-container')
    expect(map.dataset.zoom).toBe('9')
  })

  it('renders tile layer', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument()
  })

  it('renders markers for each embalse', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(2)
  })

  it('renders marker positions correctly', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    const markers = screen.getAllByTestId('marker')
    const firstPosition = JSON.parse(markers[0].dataset.position)
    const secondPosition = JSON.parse(markers[1].dataset.position)
    
    expect(firstPosition).toEqual([18.3258, -66.0086])
    expect(secondPosition).toEqual([18.4167, -66.2167])
  })

  it('renders popup with embalse name', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByText('Carraizo')).toBeInTheDocument()
    expect(screen.getByText('La Plata')).toBeInTheDocument()
  })

  it('renders popup with current level', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByText(/38.5 meters/)).toBeInTheDocument()
    expect(screen.getByText(/48.2 meters/)).toBeInTheDocument()
  })

  it('links popup to embalse detail page', () => {
    render(<EmbalsesMap embalses={mockEmbalses} />)
    
    const carraizoLink = screen.getByText('Carraizo')
    expect(carraizoLink).toHaveAttribute('href', '/embalse?id=50059000')
  })

  it('renders empty when no embalses', () => {
    render(<EmbalsesMap embalses={[]} />)
    
    const markers = screen.queryAllByTestId('marker')
    expect(markers).toHaveLength(0)
  })
})
