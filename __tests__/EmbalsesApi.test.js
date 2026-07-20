import EmbalsesApi from '../components/EmbalsesApi'

describe('EmbalsesApi', () => {
  let api

  beforeEach(() => {
    api = new EmbalsesApi()
  })

  describe('embalses', () => {
    it('returns all embalses', () => {
      const embalses = api.embalses
      expect(embalses).toHaveLength(11)
    })

    it('contains Carraizo', () => {
      const embalse = api.embalse(50059000)
      expect(embalse).toBeDefined()
      expect(embalse.commonName).toBe('Carraizo')
    })
  })

  describe('ids', () => {
    it('returns array of site IDs', () => {
      const ids = api.ids
      expect(ids).toHaveLength(11)
      expect(ids).toContain(50059000)
      expect(ids).toContain(50045000)
    })
  })

  describe('embalse', () => {
    it('finds embalse by id', () => {
      const embalse = api.embalse(50059000)
      expect(embalse.commonName).toBe('Carraizo')
    })

    it('finds embalse by string id', () => {
      const embalse = api.embalse('50059000')
      expect(embalse.commonName).toBe('Carraizo')
    })

    it('returns undefined for unknown id', () => {
      const embalse = api.embalse(99999999)
      expect(embalse).toBeUndefined()
    })
  })

  describe('processUsgsEmbalses', () => {
    const mockUsgsData = {
      value: {
        timeSeries: [
          {
            sourceInfo: {
              siteCode: [{ value: '50059000' }],
              siteName: 'Rio Grande de Loiza at Trujillo Alto',
              geoLocation: {
                geogLocation: {
                  latitude: 18.3258,
                  longitude: -66.0086
                }
              }
            },
            values: [
              {
                value: [
                  { value: '38.5', dateTime: '2024-01-01T00:00:00Z' }
                ]
              }
            ]
          }
        ]
      }
    }

    it('processes USGS data correctly', () => {
      const result = api.processUsgsEmbalses(mockUsgsData)
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(50059000)
      expect(result[0].commonName).toBe('Carraizo')
      expect(result[0].siteName).toBe('Rio Grande de Loiza at Trujillo Alto')
    })

    it('extracts geo location', () => {
      const result = api.processUsgsEmbalses(mockUsgsData)
      expect(result[0].geoLocation).toEqual([18.3258, -66.0086])
    })

    it('extracts values', () => {
      const result = api.processUsgsEmbalses(mockUsgsData)
      expect(result[0].values).toHaveLength(1)
      expect(result[0].values[0].value).toBe('38.5')
    })

    it('determines current alert level', () => {
      const result = api.processUsgsEmbalses(mockUsgsData)
      // 38.5 is observacion level for Carraizo (38.5 < 38.5 is false, so it should be control)
      expect(result[0].currentAlert).toBeDefined()
    })
  })
})
