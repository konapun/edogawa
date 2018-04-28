import edoInstrumenter from './instrumenter'
import matcher from './matchers'

const instrumenter = edoInstrumenter({})

export default {
  instrument: instrumenter.instrument,
  matcher
}

/////////
import edogawa from 'edogawa'

const conan = edogawa({
  language: 'javascript'
})

// instrumenting files will produce a modified babel ast
const instrumented = await conan.instrument([ // async
  'src/**/*.test.js',
  'src/**/*.spec.js'
])

// find test blocks using the specified matcher
const tests = await instrumented.findTests({ // async
  matcher: conan.matcher.JEST
})

// find authors of tests
const authors = await tests.findAuthors()

