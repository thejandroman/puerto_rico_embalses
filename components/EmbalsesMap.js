import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Fragment } from 'react'
import { icon } from 'leaflet'
import Link from 'next/link'
import Head from 'next/head'
import '../styles/EmbalsesMap.css'

const state = {
  lat: 18.2256014,
  lng: -66.3940944,
  zoom: 9
}
const position = [state.lat, state.lng]

const iconDefaults = {
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
}

const violetIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  ...iconDefaults
})

const greenIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  ...iconDefaults
})

const blueIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  ...iconDefaults
})

const yellowIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  ...iconDefaults
})

const orangeIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  ...iconDefaults
})

const redIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  ...iconDefaults
})

const greyIcon = icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  ...iconDefaults
})

const PopupMarker = (props) => {
  var myIcon

  switch (props.embalse.currentAlert) {
  case 'desborde':
    myIcon = violetIcon
    break
  case 'seguridad':
    myIcon = greenIcon
    break
  case 'observacion':
    myIcon = blueIcon
    break
  case 'ajustesOperacionales':
    myIcon = yellowIcon
    break
  case 'control':
    myIcon = orangeIcon
    break
  case 'fueraDeServicio':
    myIcon = redIcon
    break
  default:
    myIcon = greyIcon
  }

  return (
    <Marker position={props.embalse.geoLocation} icon={myIcon}>
      <Popup>
        <Link as={`/e/${props.embalse.id}`} href={`/embalse?id=${props.embalse.id}`}>
          <a>{props.embalse.commonName}</a>
        </Link>
        <p>{props.embalse.currentAlert}</p>
      </Popup>
    </Marker>
  )
}

const MarkersList = (props) => {
  const items = props.markers.map(marker => (
    <PopupMarker key={marker.id} embalse={marker} />
  ))
  return <Fragment>{items}</Fragment>
}

const EmbalsesMap = (props) => (
  <Map center={position} zoom={state.zoom}>
    <Head>
      <link rel='stylesheet' href='https://unpkg.com/leaflet@1.4.0/dist/leaflet.css'
            integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='
            crossorigin='' />
    </Head>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
    <MarkersList markers={props.embalses} />
  </Map>
)

export default EmbalsesMap
