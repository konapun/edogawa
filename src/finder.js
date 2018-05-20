import traverse from 'babel-traverse'
import * as t from 'babel-types'
import matcher from './matchers'
import test from './test'

/**
 * A grouping of operations related to finding tests on instrumented ASTs
 * @param {*} instrumented
 */
function finder (instrumenteds) {

  function findTestsForInstrumented (instrumented, matchers) {
    const tests = []

    traverse(instrumented.ast, {
      enter (path) {
        const node = path.node

        matchers.forEach(matcher => {
          if (matcher.match(node)) {
            tests.push(test(instrumented.path, node))
          }
        })
      }
    })

    return tests
  }

  return {
    findTests (options) {
      const extendedOpts = {
        matcher: matcher.JEST, // can be string or array
        ...options
      }

      const matchers = [].concat(extendedOpts.matcher)
      return instrumenteds
        .map(instrumented => findTestsForInstrumented(instrumented, matchers))
        .reduce((tests, group) => tests.concat(group), [])
    }
  }
}

export default finder
