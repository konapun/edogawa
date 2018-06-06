import test from 'ava';
import edogawa, { matchers } from '../dist'

const buildFinder = async () => {
  const repositoryPath = `${__dirname}/repo`
  const conan = edogawa({ repositoryPath })

  const base = __dirname
  return await conan.instrument([
    `${repositoryPath}/**/*.spec.js`,
    `${repositoryPath}/**/*.test.js`
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

  const blames = await Promise.all(tests.map(test => test.getBlame()))
  const authors = blames.map(blame => blame.originalSignature.name)
  console.log('Authors:', authors)
  t.pass()
})
