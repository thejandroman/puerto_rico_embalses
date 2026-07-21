class EmbalsesApi {
  constructor () {
    this._embalses = [
      {
        id: 50059000,
        commonName: 'Carraizo',
        municipalities: ['Trujillo Alto', 'San Juan', 'Carolina', 'Gurabo', 'Caguas'],
        nivelesDeAlerta: {
          desborde: 40.95,
          seguridad: 39.7,
          observacion: 38.5,
          ajustesOperacionales: 37,
          control: 30,
          fueraDeServicio: 0
        }
      },
      {
        id: 50045000,
        commonName: 'La Plata',
        municipalities: ['Comerío', 'Toa Alta', 'Bayamón', 'Guaynabo', 'San Juan'],
        nivelesDeAlerta: {
          desborde: 51.3,
          seguridad: 47.7,
          observacion: 44.9,
          ajustesOperacionales: 40.5,
          control: 30,
          fueraDeServicio: 0
        }
      },
      {
        id: 50047550,
        commonName: 'Cidra',
        municipalities: ['Cidra', 'Aibonito', 'Barranquitas', 'San Juan'],
        nivelesDeAlerta: {
          desborde: 403,
          seguridad: 401.71,
          observacion: 400.23,
          ajustesOperacionales: 398.37,
          control: 395.5,
          fueraDeServicio: 0
        }
      },
      {
        id: 50093045,
        commonName: 'Patillas',
        municipalities: ['Patillas', 'Arroyo', 'Guayama'],
        nivelesDeAlerta: {
          desborde: 66,
          seguridad: 62.18,
          observacion: 58.82,
          ajustesOperacionales: 57,
          control: 53.34,
          fueraDeServicio: 0
        }
      },
      {
        id: 50111210,
        commonName: 'Toa Vaca',
        municipalities: ['Villalba', 'Orocovis', 'Barros', 'Toa Alta'],
        nivelesDeAlerta: {
          desborde: 164,
          seguridad: 148,
          observacion: 139.6,
          ajustesOperacionales: 132.6,
          control: 123,
          fueraDeServicio: 0
        }
      },
      {
        id: 50039995,
        commonName: 'Carite',
        municipalities: ['Guayama', 'Arroyo', 'Salinas'],
        nivelesDeAlerta: {
          desborde: 542.94,
          seguridad: 541.16,
          observacion: 538.16,
          ajustesOperacionales: 536.16,
          control: 532.16,
          fueraDeServicio: 0
        }
      },
      {
        id: 50076800,
        commonName: 'Rio Blanco',
        municipalities: ['Naguabo', 'Humacao', 'Yabucoa', 'Las Piedras', 'Vieques', 'Culebra'],
        nivelesDeAlerta: {
          desborde: 28.75,
          seguridad: 26.5,
          observacion: 24.25,
          ajustesOperacionales: 22.5,
          control: 20,
          fueraDeServicio: 0
        }
      },
      {
        id: 50026140,
        commonName: 'Caonillas',
        municipalities: ['Utuado', 'Adjuntas', 'Lares'],
        nivelesDeAlerta: {
          desborde: 252,
          seguridad: 248,
          observacion: 244,
          ajustesOperacionales: 242,
          control: 235,
          fueraDeServicio: 0
        }
      },
      {
        id: 50071225,
        commonName: 'Fajardo',
        municipalities: ['Fajardo', 'Luquillo', 'Ceiba'],
        nivelesDeAlerta: {
          desborde: 52.5,
          seguridad: 48.3,
          observacion: 44.5,
          ajustesOperacionales: 40.5,
          control: 36,
          fueraDeServicio: 0
        }
      },
      {
        id: 50010800,
        commonName: 'Guajataca',
        municipalities: ['Isabela', 'Quebradillas', 'San Sebastián', 'Aguadilla', 'Moca', 'Rincón', 'Aguada', 'Lajas', 'Sabana Grande', 'Mayagüez'],
        nivelesDeAlerta: {
          desborde: 196.5,
          seguridad: 194,
          observacion: 190,
          ajustesOperacionales: 186,
          control: 184,
          fueraDeServicio: 0
        }
      },
      {
        id: 50113950,
        commonName: 'Cerrillos',
        municipalities: ['Ponce', 'Juana Díaz', 'Villalba', 'Orocovis'],
        nivelesDeAlerta: {
          desborde: 174.7,
          seguridad: 160.9,
          observacion: 152.4,
          ajustesOperacionales: 144.8,
          control: 137.5,
          fueraDeServicio: 0
        }
      }
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
        municipalities: embalse.municipalities,
        geoLocation: this.geoLocation(reservoir),
        values: this.values(reservoir),
        currentAlert: this.currentAlert(id, reservoir),
        alertLevels: embalse.nivelesDeAlerta
      }
    })
  }
}

export default EmbalsesApi
