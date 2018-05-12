# Edogawa
Edogawa is a library for locating and running git metrics on test files. It's
named after the main character from [Case Closed](https://en.wikipedia.org/wiki/Case_Closed)
because every other famous detective's name is already used by other projects.

None of this is finalized and will probably change in the future.

## Example Usage
```js
import edogawa, { matchers } from 'edogawa'

const conan = edogawa()

const baseRepo = 'path/to/some/repository'
const instrumented = await conan.instrument([ // locate all test files in repository
  `${baseRepo}/**/*.spec.js`,
  `${baseRepo}/**/*.test.js`
])

const tests = await instrumented.findTests({
  matcher: [ // can pass one or many matchers
    matchers.DESCRIBE({ // included matchers are described in detail below
      includeNestedTests: true
    })
  ]
})

// Tests provide operations on the repository for finding git information on the individual tests
const testAuthors = tests.map(test => test.findAuthors())
// ...
```

## Instrumenting Files
Instrumenting refers to the process of transforming the source into an abstract
syntax tree. The base edogawa object exposes an `instrument` method which takes
a path or array of paths of files to instrument. Supported patterns are the same
as supported by [globby](https://www.npmjs.com/package/globby). Instrumented
files will be returned as an `edogawa#finder` described below.

## Finding Tests Within Files
Once test files have been identified, individual tests within the test files can
be extracted using a matcher. Edogawa currently includes two matchers but you
can easily create your own to pass in as an option.

### Included Matchers
#### Describe
The Describe matcher matches `describe` blocks within a test file. For instance,
```js
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1)
    })
  })
})
```
will by default return two matches: the `describe` for "Array" and the `describe`
for "#indexOf" and operations on the `edogawa#test` object (described below)
will be performed on these blocks. If you only wish to capture top-level
`describe` blocks, pass `{ includeNestedTests: false }` as an option to the
matcher.

#### File
If you don't care about individual test blocks, the File finder is the way to
go. This will match everything within a test file.

### Defining Custom Matchers
A matcher is just an object which exposes a `match` method which takes a Babel
AST node from a traversal.

```js
const tests = await instrumented.findTests({
  matcher: {
    match (node) {
      return node.type === 'CallExpression'
        && node.callee.type === 'Identifier'
        && node.callee.name === 'describe'
    }
  }
})
```

## Finding Git Information on a Test
`TODO`
