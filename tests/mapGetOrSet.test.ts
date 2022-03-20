import { mapGetOrSet } from '../lib/index.js'
import { fake } from 'sinon'
import { equal } from 'assert/strict'

it('get', () => {
  const map = new Map().set('a', 'Apple')
  const getFallback = fake()
  equal(mapGetOrSet(map, 'a', getFallback), 'Apple')
  equal(getFallback.callCount, 0)
})

it('set', () => {
  const map = new Map()
  const getFallback = fake(() => 'Apple')
  equal(mapGetOrSet(map, 'a', getFallback), 'Apple')
  equal(getFallback.callCount, 1)
})

it('undefined value', () => {
  const map = new Map<string, undefined | string>().set('Crab', undefined)
  const getFallback = fake(() => 'Apple')
  equal(mapGetOrSet(map, 'Crab', getFallback), undefined)
  equal(getFallback.callCount, 0)
})
