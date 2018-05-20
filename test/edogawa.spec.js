import test from 'ava';
import edogawa, { matchers } from '../dist'

const buildFinder = async () => {
  const conan = edogawa()

  const base = __dirname
  return await conan.instrument([
    `${base}/repo/**/*.spec.js`,
    `${base}/repo/**/*.test.js`
  ])
}

const buildTests = async (matcher) => {
  const finder = await buildFinder()
  return await finder.findTests({
    matcher
  })
}

test('Initializes without error', t => {
  const conan = edogawa()
  t.pass()
})

test('Locates files for instrumenting', async t => {
  const foundTests = await buildTests(matchers.FILE())

  t.is(foundTests.length, 3)
})

test('Locates describe blocks within a test file', async t => {
  t.fail('Test not implemented')
})

test('Finds authors for test files', async t => {
  const tests = await buildTests(matchers.FILE())

  console.log('Tests:', tests)
  const authors = tests.map(test => test.findAuthors())
  console.log('Authors:', authors)
})
