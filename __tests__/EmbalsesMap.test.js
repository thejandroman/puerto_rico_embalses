import { render, screen } from '@testing-library/react'
import EmbalsesMap from '../components/EmbalsesMap'
import { LanguageProvider } from '../context/LanguageContext'

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
  Popup: ({ children }) => <div data-testid='popup'>{children}</div>,
  Circle: () => null,
  useMap: () => ({
    fitBounds: jest.fn()
  })
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

// Mock fetch for municipios
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ features: [] })
  })
)

const renderWithLanguage = (ui) => {
  return render(
    <LanguageProvider>
      {ui}
    </LanguageProvider>
  )
}

const mockEmbalses = [
  {
    id: 50059000,
    commonName: 'Carraizo',
    currentAlert: 'observacion',
    municipalities: ['Trujillo Alto', 'San Juan', 'Carolina'],
    geoLocation: [18.3258, -66.0086],
    values: [{ value: '38.5' }]
  },
  {
    id: 50045000,
    commonName: 'La Plata',
    currentAlert: 'seguridad',
    municipalities: ['Comerío', 'Toa Alta', 'Bayamón'],
    geoLocation: [18.4167, -66.2167],
    values: [{ value: '48.2' }]
  }
]

describe('EmbalsesMap', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders the map container', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })

  it('renders with correct center position', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    const map = screen.getByTestId('map-container')
    const center = JSON.parse(map.dataset.center)
    
    expect(center).toEqual([18.2256014, -66.3940944])
  })

  it('renders with zoom level 9', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    const map = screen.getByTestId('map-container')
    expect(map.dataset.zoom).toBe('9')
  })

  it('renders tile layer', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument()
  })

  it('renders markers for each embalse', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(2)
  })

  it('renders marker positions correctly', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    const markers = screen.getAllByTestId('marker')
    const firstPosition = JSON.parse(markers[0].dataset.position)
    const secondPosition = JSON.parse(markers[1].dataset.position)
    
    expect(firstPosition).toEqual([18.3258, -66.0086])
    expect(secondPosition).toEqual([18.4167, -66.2167])
  })

  it('renders popup with embalse name', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByText('Carraizo')).toBeInTheDocument()
    expect(screen.getByText('La Plata')).toBeInTheDocument()
  })

  it('renders popup with municipalities', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    expect(screen.getByText(/Trujillo Alto/)).toBeInTheDocument()
    expect(screen.getByText(/Comerío/)).toBeInTheDocument()
  })

  it('links popup to embalse detail page', () => {
    renderWithLanguage(<EmbalsesMap embalses={mockEmbalses} />)
    
    const carraizoLink = screen.getByText('Carraizo')
    expect(carraizoLink).toHaveAttribute('href', '/embalse?id=50059000')
  })

  it('renders empty when no embalses', () => {
    renderWithLanguage(<EmbalsesMap embalses={[]} />)
    
    const markers = screen.queryAllByTestId('marker')
    expect(markers).toHaveLength(0)
  })
})
