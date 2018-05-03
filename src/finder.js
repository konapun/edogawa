import traverse from 'babel-traverse'
import * as t from 'babel-types'
import matcher from './matchers'

/**
 * A grouping of operations related to finding tests on instrumented ASTs
 * @param {*} asts an array of Babylon ASTs from instrumenting
 */
function finder (asts) {

  function findTest (ast, matcher) {
    traverse(ast, {
      enter (path) {
        console.log('Traverse: enter:', path)
      }
    })
  }

  return {
    findTests (options) {
      const extendedOpts = {
        matcher: matcher.JEST,
        ...options
      }

      const tests = asts.map(ast => findTest(ast, options.matcher))
      console.log('Finding all tests on', asts.length, 'source files')
    }
  }
}

export default finder
