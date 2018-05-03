import readFile from 'fs-readfile-promise'
import globby from 'globby'
import { parse } from 'babylon'
import finder from './finder'

/**
 *
 * @param {*} options
 */
function instrumenter (options) {
  const extendedOpts = {
    encoding: 'utf8',
    sourceType: 'module',
    ...options
  }

  async function instrumentPath (path) {
    const buffer = await readFile(path, extendedOpts.encoding)
    const ast = parse(buffer, extendedOpts)

    return ast
  }

  return {
    async instrument (queries) {
      const matches = await globby(queries) // TODO: options for globby
      const asts = await Promise.all(
        matches.map(async path => instrumentPath(path))
      )

      return finder(asts)
    }
  }
}

export default instrumenter
