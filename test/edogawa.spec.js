import test from 'ava';
import edogawa from '../dist'

test('Initializes without error', t => {
	const conan = edogawa()
	t.pass()
})

test('bar', async t => {
	const bar = Promise.resolve('bar');

	t.is(await bar, 'bar');
});
