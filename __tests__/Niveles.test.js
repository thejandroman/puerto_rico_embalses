import { render, screen } from '@testing-library/react'
import Niveles from '../components/Niveles'

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Bar: ({ data, options }) => (
    <div data-testid='bar-chart' data-chart-data={JSON.stringify(data)} data-chart-options={JSON.stringify(options)}>
      Mock Bar Chart
    </div>
  )
}))

const mockEmbalses = [
  {
    id: 50059000,
    commonName: 'Carraizo',
    currentAlert: 'observacion',
    alertLevels: {
      desborde: 40.8,
      seguridad: 39.7,
      observacion: 38.5,
      ajustesOperacionales: 37.2,
      control: 31.5,
      fueraDeServicio: 0
    },
    values: [{ value: '38.5' }]
  },
  {
    id: 50045000,
    commonName: 'La Plata',
    currentAlert: 'seguridad',
    alertLevels: {
      desborde: 51.3,
      seguridad: 47.7,
      observacion: 44.9,
      ajustesOperacionales: 40.5,
      control: 32,
      fueraDeServicio: 0
    },
    values: [{ value: '48.2' }]
  }
]

describe('Niveles', () => {
  it('renders the bar chart', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('passes embalse names as labels', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    const chart = screen.getByTestId('bar-chart')
    const data = JSON.parse(chart.dataset.chartData)
    
    expect(data.labels).toEqual(['Carraizo', 'La Plata'])
  })

  it('creates a single dataset with all values', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    const chart = screen.getByTestId('bar-chart')
    const data = JSON.parse(chart.dataset.chartData)
    
    expect(data.datasets).toHaveLength(1)
    expect(data.datasets[0].label).toBe('Nivel Actual')
  })

  it('includes current values in dataset data', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    const chart = screen.getByTestId('bar-chart')
    const data = JSON.parse(chart.dataset.chartData)
    
    expect(data.datasets[0].data).toContain(38.5)
    expect(data.datasets[0].data).toContain(48.2)
  })

  it('colors bars based on alert level', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    const chart = screen.getByTestId('bar-chart')
    const data = JSON.parse(chart.dataset.chartData)
    
    // observacion = blue, seguridad = green
    expect(data.datasets[0].backgroundColor[0]).toContain('66,105,225')
    expect(data.datasets[0].backgroundColor[1]).toContain('32,139,34')
  })

  it('hides legend in options', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    const chart = screen.getByTestId('bar-chart')
    const options = JSON.parse(chart.dataset.chartOptions)
    
    expect(options.plugins.legend.display).toBe(false)
  })

  it('starts y-axis at zero', () => {
    render(<Niveles embalses={mockEmbalses} />)
    
    const chart = screen.getByTestId('bar-chart')
    const options = JSON.parse(chart.dataset.chartOptions)
    
    expect(options.scales.y.beginAtZero).toBe(true)
  })
})
