import { Repository, Blame } from 'nodegit'
import path from 'path'
import fs from 'fs'
import createBlame from './blame'

/**
 * This wraps a test found by the finder
 */
function test (file, match, options) {
  const repositoryPath = options.repositoryPath // FIXME: find
  const repoPromise = Repository.open(repositoryPath)

  return {
    async getBlame () {
      const repo = await repoPromise
      const filePath = truncateFilePath(file, repositoryPath)
      const blame = await Blame.file(repo, filePath)

      const hunks = [...Array(blame.getHunkCount()).keys()].map(i => blame.getHunkByIndex(i))
      return createBlame(hunks)
    }
  }
}

function truncateFilePath (filePath, repoPath) {
  return filePath.replace(`${repoPath}/`, '')
}

function findRepository (file) {
  const filepath = path.dirname(file)
  const repo = path.join(filepath, '.git')
  return new Promise((resolve, reject) => {
    fs.access(repo, fs.constants.R_OK, err => {
      if (err) {
        reject(err)
      } else {
        resolve(filepath)
      }
    })
  })
}

export default test
