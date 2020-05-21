import { calc } from '@/lib/calc/aurora'
import { MONTHLY_HOURS } from '@/config/constants'

describe('aurora', () => {
  test('Auroraの料金を計算できる', () => {
    const priceList = {
      aurora: {
        instance: {
          MySQL: [
            {
              price: 0.35,
              instanceType: 'db.r4.large'
            }
          ]
        },
        storage: {
          price: 0.12
        },
        io: {
          price: 2.4e-7
        }
      }
    }
    const emptyRow = {
      engine: 'MySQL',
      instance: '',
      unit: 0,
      storage: 0,
      io: 0
    }

    expect(calc(emptyRow, priceList)).toBe(0)

    const row = {
      engine: 'MySQL',
      instance: 'db.r4.large',
      unit: 3,
      storage: 100,
      io: 10000000
    }

    const instance = priceList.aurora.instance.MySQL[0].price * MONTHLY_HOURS * row.unit
    const storage = priceList.aurora.storage.price * row.storage
    const io = priceList.aurora.io.price * row.io
    const expected = instance + storage + io

    expect(calc(row, priceList)).toBe(expected)
  })
})
