/**
 * The describe matcher matches on `describe` blocks in test files
 *
 * @param {*} opts
 */
function matcher (opts) {
  const includeNestedDescribes = opts.includeNestedTests || false

  return {
    match (node) {
      const isDescribeStatement = node.type === 'CallExpression'
        && node.callee.type === 'Identifier'
          && node.callee.name === 'describe'

      if (isDescribeStatement) {
        if (includeNestedDescribes) return true

        // TODO: check if describe is nested inside other describe
      }
    }
  }
}

export default matcher
