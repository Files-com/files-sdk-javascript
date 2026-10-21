// A browser bundle's use of the package, type-checked (not run) by `npm run test:types`. A bundler reads the package
// root and src/ paths as ES modules (package.json's `module` field), and lib/ paths as the CommonJS build.
import Files from 'files.com'
import LibUser from 'files.com/lib/models/User'
import FilesClient from 'files.com/src/FilesClient'
import { Logger } from 'files.com/src/index'
import { LogLevel } from 'files.com/src/Logger'
import User from 'files.com/src/models/User'
// @ts-expect-error An ES module has only its default export: call a static method on its class.
import { list } from 'files.com/src/models/User'

Files.setLogLevel(LogLevel.NONE)
Files.setBaseUrl(window.location.origin)
Logger.pause()

export const firstPage = (): Promise<User[]> => User.list({ per_page: 100 }, { autoPaginate: false })

export const users = (): AsyncIterableIterator<User> => User.listIterator({ per_page: 100 })

// A client made directly in a bundle, from the ES module src/FilesClient.js.
export const siteUsers = (): Promise<User[]> =>
  new FilesClient({ baseUrl: window.location.origin }).users.list({ per_page: 100 })

// A CommonJS module's class is also its own `default`; an ES module's class is not, nor is the package root in a bundle.
export const commonJsDefault: typeof LibUser = LibUser.default

// @ts-expect-error The ES module's class has no `default`.
export const esModuleDefault = User.default

// @ts-expect-error A bundle's files.com is the ES module src/Files.js.
export const rootDefault = Files.default

export { list }
