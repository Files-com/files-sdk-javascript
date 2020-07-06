const isArray = value => Array.isArray(value)

const isInt = value => typeof value === 'number'

const isObject = value => value && typeof value === 'object' && !Array.isArray(value)

const isString = value => typeof value === 'string'

const isEmpty = value => !value ||
  (isArray(value) && value.length === 0) ||
  (isObject(value) && Object.keys(value).length === 0)

const getType = value =>
  isArray(value)
    ? 'array'
    : typeof value

const isBrowser = () => typeof self !== 'undefined' && typeof self.document !== 'undefined'

export {
  getType,
  isArray,
  isBrowser,
  isEmpty,
  isInt,
  isObject,
  isString,
}
