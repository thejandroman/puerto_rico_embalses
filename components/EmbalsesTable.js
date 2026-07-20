import Link from 'next/link'

function deCamelCase(camelCase) {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) { return str.toUpperCase() })
}

const EmbalseRow = props => (
  <tr>
    <td>
      <Link href={`/embalse?id=${props.embalse.id}`}>
        {props.embalse.commonName}
      </Link>
    </td>
    <td>{new Date(props.embalse.values[0].dateTime).toString()}</td>
    <td>{deCamelCase(props.embalse.currentAlert)}</td>
    <td>{props.embalse.values[0].value}</td>
  </tr>
)

const EmbalsesTable = props => (
  <table className='table table-striped'>
    <thead>
      <tr>
        <th scope='col'>Embalse</th>
        <th scope='col'>Last Updated</th>
        <th scope='col'>Current Alert</th>
        <th scope='col'>Current Level (meters)</th>
      </tr>
    </thead>
    <tbody>
      {props.embalses.map(embalse => (
        <EmbalseRow embalse={embalse} key={embalse.id} />
      ))}
    </tbody>
  </table>
)

export default EmbalsesTable
