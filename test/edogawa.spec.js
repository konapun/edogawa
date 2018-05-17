import test from 'ava';
import edogawa from '../dist'

console.log('Edogawa is', edogawa)
test('foo', t => {
	t.pass();
});

test('bar', async t => {
	const bar = Promise.resolve('bar');

	t.is(await bar, 'bar');
});
