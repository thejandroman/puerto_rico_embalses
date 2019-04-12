class EmbalsesApi {
  constructor () {
    this._embalses = [
      {id: 50059000, commonName: 'Carraizo', nivelesDeAlerta: {desborde: 40.8, seguridad: 39.7, observacion: 38.5, ajustesOperacionales: 37.2, control: 31.5, fueraDeServicio: 0}},
      {id: 50045000, commonName: 'La Plata', nivelesDeAlerta: {desborde: 51.3, seguridad: 47.7, observacion: 44.9, ajustesOperacionales: 40.5, control: 32, fueraDeServicio: 0}},
      {id: 50047550, commonName: 'Cidra', nivelesDeAlerta: {desborde: 403, seguridad: 402, observacion: 401, ajustesOperacionales: 399.6, control: 398, fueraDeServicio: 0}},
      {id: 50093045, commonName: 'Patillas', nivelesDeAlerta: {desborde: 66, seguridad: 62.18, observacion: 58.82, ajustesOperacionales: 57, control: 53.34, fueraDeServicio: 0}},
      {id: 50111210, commonName: 'Toa Vaca', nivelesDeAlerta: {desborde: 161, seguridad: 152, observacion: 145, ajustesOperacionales: 139, control: 123, fueraDeServicio: 0}},
      {id: 50039995, commonName: 'Carite', nivelesDeAlerta: {desborde: 544, seguridad: 542, observacion: 539, ajustesOperacionales: 537, control: 533, fueraDeServicio: 0}},
      {id: 50076800, commonName: 'Rio Blanco', nivelesDeAlerta: {desborde: 28.75, seguridad: 26.5, observacion: 24.25, ajustesOperacionales: 22.5, control: 20, fueraDeServicio: 0}},
      {id: 50026140, commonName: 'Caonillas', nivelesDeAlerta: {desborde: 252, seguridad: 248, observacion: 244, ajustesOperacionales: 242, control: 235, fueraDeServicio: 0}},
      {id: 50071225, commonName: 'Fajardo', nivelesDeAlerta: {desborde: 52.5, seguridad: 48.3, observacion: 44.5, ajustesOperacionales: 40.5, control: 36, fueraDeServicio: 0}},
      {id: 50010800, commonName: 'Guajataca', nivelesDeAlerta: {desborde: 196.9, seguridad: 194, observacion: 190, ajustesOperacionales: 186, control: 184, fueraDeServicio: 0}},
      {id: 50125780, commonName: 'Cerrillos', nivelesDeAlerta: {desborde: 175, seguridad: 160, observacion: 155.5, ajustesOperacionales: 149.4, control: 137.2, fueraDeServicio: 0}}
    ]
  }

  get embalses () {
    return this._embalses
  }

  get ids () {
    return this._embalses.map(embalse => { return embalse.id })
  }

  embalse (id) {
    const embalseIndex = this._embalses.findIndex((embalse) => {
      return parseInt(embalse.id) === parseInt(id)
    })
    return this._embalses[embalseIndex]
  }

  currentAlert (id, usgsReservoir) {
    const oid = parseInt(id)
    const embalse = this.embalse(oid)
    const value = usgsReservoir.values[0].value[0].value

    return Object.keys(embalse.nivelesDeAlerta)
      .filter(key => embalse.nivelesDeAlerta[key] < value)[0]
  }

  values (usgsReservoir) {
    return usgsReservoir.values[0].value.map(value => {
      return { value: value.value, dateTime: value.dateTime }
    })
  }

  id (usgsReservoir) {
    return parseInt(usgsReservoir.sourceInfo.siteCode[0].value)
  }

  geoLocation (usgsReservoir) {
    return [usgsReservoir.sourceInfo.geoLocation.geogLocation.latitude, usgsReservoir.sourceInfo.geoLocation.geogLocation.longitude]
  }

  processUsgsEmbalses (usgsReservoirs) {
    return usgsReservoirs.value.timeSeries.map(reservoir => {
      const id = this.id(reservoir)
      const embalse = this.embalse(id)

      return {
        id: id,
        commonName: embalse.commonName,
        siteName: reservoir.sourceInfo.siteName,
        geoLocation: this.geoLocation(reservoir),
        values: this.values(reservoir),
        currentAlert: this.currentAlert(id, reservoir)
      }
    })
  }
}

export default EmbalsesApi
