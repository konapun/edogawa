import Git from 'nodegit'

/**
 * This wraps a test found by the finder
 */
function test (file, match) {

  console.log('Creating test object for file', file)
  // console.log(`Creating test for file ${file} around match`, match)
  return {
    findAuthors () {
      return [
        'me'
      ]
    }
  }
}

export default test
