import edogawa from '../src'
import path from 'path'

const main = async () => {
  const conan = edogawa({
    language: 'javascript'
  })

  // instrumenting files will produce a modified babel ast
  const instrumented = await conan.instrument([ // async
    path.join(__dirname, 'repo', '**', '*.spec.js'),
    path.join(__dirname, 'repo', '**', '*.test.js')
  ])

  console.log('Instrumented:', instrumented)
  // find test blocks using the specified matcher
  const tests = await instrumented.findTests({ // async
    matcher: conan.matcher.JEST
  })

  /*
  // find authors of tests
  const authors = await tests.findAuthors()
  */
}

try {
  main()
} catch (e) {
  console.log(e)
}
