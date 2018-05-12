import edogawa, { languages, matchers } from '../src'
import path from 'path'

const main = async () => {
  const conan = edogawa({
    language: languages.JAVASCRIPT
  })

  // instrumenting files will produce a modified babel ast
  const instrumented = await conan.instrument([ // async
    path.join(__dirname, 'repo', '**', '*.spec.js'),
    path.join(__dirname, 'repo', '**', '*.test.js')
  ])

  // find test blocks using the specified matcher
  const tests = await instrumented.findTests({ // async
    matcher: [
      matchers.FILE()
    ]
  })

  console.log('Tests:', tests)
  // find authors of tests
  const authors = tests.map(test => test.findAuthors())

  console.log('Got authors', authors)
}

try {
  main()
} catch (e) {
  console.log(e)
}
