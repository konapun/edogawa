/**
 *
 * @param {BlameHunk} hunk An instance of http://www.nodegit.org/api/blame_hunk/
 */
function blame (hunk) {
  console.log('Creating blame from hunk', hunk)
  return {
    get email() {
      // TODO:
    }

  }
}

export default blame
