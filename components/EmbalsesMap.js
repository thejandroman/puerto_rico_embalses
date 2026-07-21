import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
import { Fragment, useState, useEffect } from 'react'
import { icon } from 'leaflet'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css'
import { useLanguage } from '../context/LanguageContext'

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

function MunicipalityHighlight({ selectedEmbalse, municipios }) {
  if (!selectedEmbalse || !municipios) return null
  
  const matchingMunicipios = municipios.features.filter(f => 
    selectedEmbalse.municipalities.includes(f.properties.NAME)
  )
  
  return (
    <Fragment>
      {matchingMunicipios.map((m, i) => {
        if (m.geometry.type === 'Point') {
          return (
            <Circle
              key={i}
              center={[m.geometry.coordinates[1], m.geometry.coordinates[0]]}
              radius={3000}
              pathOptions={{
                color: '#3388ff',
                fillColor: '#3388ff',
                fillOpacity: 0.3,
                weight: 2
              }}
            />
          )
        }
        return null
      })}
    </Fragment>
  )
}

const PopupMarker = ({ embalse, onSelect }) => {
  const { t } = useLanguage()
  let myIcon

  switch (embalse.currentAlert) {
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
    <Marker 
      position={embalse.geoLocation} 
      icon={myIcon}
      eventHandlers={{
        click: () => onSelect(embalse)
      }}
    >
      <Popup>
        <Link href={`/embalse?id=${embalse.id}`}>
          {embalse.commonName}
        </Link>
        <p>{t('map.currentAlert')}: {t(`alerts.${embalse.currentAlert}`)}
          <br />{t('map.currentLevel')}: {embalse.values[0].value} m</p>
        <p><strong>{t('map.servesMunicipalities')}:</strong><br />
          {embalse.municipalities.join(', ')}
        </p>
      </Popup>
    </Marker>
  )
}

const MarkersList = ({ markers, onSelect }) => {
  const items = markers.map(marker => (
    <PopupMarker key={marker.id} embalse={marker} onSelect={onSelect} />
  ))
  return <Fragment>{items}</Fragment>
}

const EmbalsesMap = ({ embalses }) => {
  const [selectedEmbalse, setSelectedEmbalse] = useState(null)
  const [municipios, setMunicipios] = useState(null)

  useEffect(() => {
    fetch('/data/municipios.json')
      .then(res => res.json())
      .then(data => setMunicipios(data))
      .catch(err => console.error('Failed to load municipios:', err))
  }, [])

  return (
    <MapContainer center={position} zoom={state.zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      <MarkersList markers={embalses} onSelect={setSelectedEmbalse} />
      <MunicipalityHighlight selectedEmbalse={selectedEmbalse} municipios={municipios} />
    </MapContainer>
  )
}

export default EmbalsesMap
