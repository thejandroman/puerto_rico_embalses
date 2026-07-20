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
      labels: embalses.map(embalse => { return embalse.commonName }),
      datasets: embalses.map(embalse => {
        const index = embalses.findIndex(emb => emb.id === embalse.id)
        const data = new Array(index).fill(null)
        data.push(embalses[index].values[0].value)
        return {
          label: embalse.currentAlert,
          yAxisID: embalse.id,
          data: data,
          ...this.processColors(embalse.currentAlert)
        }
      })
    }
    return data
  }

  processColors (currentAlert) {
    const backgroundAlpha = 0.2
    const borderAlpha = 1
    const hoverBackgroundAlpha = 0.4
    const hoverBorderAlpha = 1

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

    const colors = {
      backgroundColor: `rgba(${rgb},${backgroundAlpha})`,
      borderColor: `rgba(${rgb},${borderAlpha})`,
      hoverBackgroundColor: `rgba(${rgb},${hoverBackgroundAlpha})`,
      hoverBorderColor: `rgba(${rgb},${hoverBorderAlpha})`
    }

    return colors
  }

  processOptions (_embalses) {
    return {
      plugins: {
        datalabels: {
          clamp: true,
          anchor: 'start',
          align: 'top'
        },
        legend: { display: false }
      },
      scales: {}
    }
  }

  render () {
    return <Bar data={this.state.data} options={this.state.options} />
  }
}

export default Niveles
