import pathNormalizer = require('./utils/pathNormalizer')

/** `'array'` for an array, otherwise what `typeof` says. */
export declare function getType(value: unknown): 'array' | 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'

export declare function isArray(value: unknown): value is unknown[]

/** Whether the SDK runs in a browser, where disk and stream transfers are not available. */
export declare function isBrowser(): boolean

/** Whether the value is falsy, an empty array or an object without keys. */
export declare function isEmpty(value: unknown): boolean

/** Whether the value is a number, not only an integer. */
export declare function isInt(value: unknown): value is number

/**
 * Whether the value is an object other than an array or null. A falsy value is returned as it is instead of `false`,
 * so use the result only as a condition.
 */
export declare function isObject(value: unknown): boolean | number | 0n | '' | null | undefined

export declare function isString(value: unknown): value is string

export { pathNormalizer }
