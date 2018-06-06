import signature from './signature'

/**
 *
 * @param {BlameHunk} hunk An instance of http://www.nodegit.org/api/blame_hunk/
 */
function blame (hunks) {
  console.log('Creating blame with', hunks.length, 'hunks') // FIXME: when would there be more than one hunk? and then what, huh? then what?
  return {
    get originalSignature () {
      const signatures = hunks.map(hunk => hunk.origSignature())
      return signature(signatures[0])
    },

    get finalSignature () {
      const signatures = hunks.map(hunk => hunk.finalSignature())
      return signature(signatures[0])
    },

    get originalCommitId () {
      const commitIds = hunks.map(hunk => hunk.origCommitId())
      return commitIds[0]
    },

    get finalCommitId () {
      const commitIds = hunks.map(hunk => hunk.finalCommitId())
      return commitIds[0]
    }
  }
}

export default blame
