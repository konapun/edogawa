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

test('Initializes without error', t => {
	const conan = edogawa()
	t.pass()
})

test('Locates files for instrumenting', async t => {
	const finder = await buildFinder()
	const foundTests = await finder.findTests({
		matcher: matchers.FILE()
	})

	t.is(foundTests.length, 3)
})

test('Locates describe blocks within a test file', async t => {
	t.fail('Test not implemented')
})
