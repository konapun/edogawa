import readFile from 'fs-readfile-promise'
import globby from 'globby'
import babylon from 'babylon'

/**
 *
 * @param {*} options
 */
function instrumenter (options) {
  const extendedOpts = {
    encoding: 'utf8',
    ...options
  }
  async function instrumentPath (path) {
    const buffer = await readFile(path, options.encoding)
    const ast = babylon(buffer)

    console.log('AST:', ast)
    return ast
  }

  return {
    async instrument (queries) {
      const matches = await globby(queries) // TODO: options for globby

      return matches.map(async path => locater(instrumentPath(path)))
    }
  }
}

/**
 * A grouping of operations related to finding tests on the instrumented AST
 * @param {*} ast
 */
function locater (ast) {
  return {
    findTests (opts) {

    }
  }
}

export default instrumenter
