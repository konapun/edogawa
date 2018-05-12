/**
 * The file matcher matches the whole test file rather than finding specific
 * test statement blocks
 */
function matcher () {
  return {
    match (node) {
      return node.type === 'Program'
    }
  }
}

export default matcher
