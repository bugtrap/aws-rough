import { calc } from '@/lib/calc/rds'
import { MONTHLY_HOURS } from '@/config/constants'

describe('rds', () => {
  test('RDSの料金を計算できる', () => {
    const priceList = {
      rds: {
        instance: {
          MySQL: [
            {
              price: 0.01,
              instanceType: 'db.t2.micro'
            }
          ]
        },
        storage: {
          gp2: {
            price: 0.1
          }
        }
      }
    }
    const emptyRow = {
      engine: 'MySQL',
      instance: '',
      unit: 0,
      storage: 0
    }

    expect(calc(emptyRow, priceList)).toBe(0)

    const row = {
      engine: 'MySQL',
      instance: 'db.t2.micro',
      unit: 3,
      storage: 50
    }

    const azOptions = ['Single-AZ', 'Multi-AZ']

    const testCalcCorrectly = az => {
      const multi = az === 'Multi-AZ' ? 2 : 1
      const instance = priceList.rds.instance.MySQL[0].price * MONTHLY_HOURS * row.unit * multi
      const storage = priceList.rds.storage.gp2.price * row.storage * row.unit * multi
      const expected = instance + storage

      expect(calc({ ...row, az }, priceList)).toBe(expected)
    }

    azOptions.forEach(az => testCalcCorrectly(az))
  })
})
