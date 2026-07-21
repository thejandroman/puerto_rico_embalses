import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Component } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

class Niveles extends Component {
  constructor (props) {
    super(props)
    this.state = {data: this.processData(props.embalses), options: this.processOptions(props.embalses)}
  }

  processData (embalses) {
    const data = {
      labels: embalses.map(embalse => embalse.commonName),
      datasets: [{
        label: 'Nivel Actual (%)',
        data: embalses.map(embalse => {
          const currentValue = parseFloat(embalse.values[0].value)
          const controlLevel = embalse.alertLevels.control
          const desbordeLevel = embalse.alertLevels.desborde
          const range = desbordeLevel - controlLevel
          const percentage = ((currentValue - controlLevel) / range) * 100
          return Math.round(Math.max(0, Math.min(100, percentage)))
        }),
        backgroundColor: embalses.map(embalse => this.getColor(embalse.currentAlert, 0.6)),
        borderColor: embalses.map(embalse => this.getColor(embalse.currentAlert, 1)),
        borderWidth: 2
      }]
    }
    return data
  }

  getColor (currentAlert, alpha) {
    let rgb = '236,236,236' // gray default

    switch (currentAlert) {
    case 'desborde':
      rgb = '149,0,211' // purple
      break
    case 'seguridad':
      rgb = '32,139,34' // green
      break
    case 'observacion':
      rgb = '66,105,225' // blue
      break
    case 'ajustesOperacionales':
      rgb = '255,255,4' // yellow
      break
    case 'control':
      rgb = '255,165,2' // orange
      break
    case 'fueraDeServicio':
      rgb = '192,1,0' // red
      break
    }

    return `rgba(${rgb},${alpha})`
  }

  processOptions (embalses) {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        datalabels: {
          clamp: true,
          anchor: 'end',
          align: 'top',
          formatter: (value) => value + '%',
          font: {
            weight: 'bold'
          }
        },
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const embalse = embalses[context.dataIndex]
              const currentValue = parseFloat(embalse.values[0].value)
              return `${currentValue} m`
            },
            afterLabel: (context) => {
              const embalse = embalses[context.dataIndex]
              return `Alerta: ${embalse.currentAlert}`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: '% de Nivel de Desborde'
          },
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  }

  render () {
    return <Bar data={this.state.data} options={this.state.options} />
  }
}

export default Niveles
