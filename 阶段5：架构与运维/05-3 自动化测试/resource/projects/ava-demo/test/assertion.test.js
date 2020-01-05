import test from 'ava'

test('pass assertion', async t => {
  t.pass()
})

test('fail assertion', async t => {
  t.is.skip() // fail()
})

test('assert test', async t => {
  t.assert(true, 'assert function , assert assertion')
})
// test(',true or ,false')

test('not test', async t => {
  t.not(1, 2)
})

test('regex test', async t => {
  // notRegex
  t.regex('jsx', new RegExp('js'))
})

test('throws fn test', async t => {
  t.throws(() => {
    throw new TypeError('type error in ava')
  }, TypeError)
})

const fn = () => {
  throw new TypeError('🦄');
};

test('throws', t => {
  const error = t.throws(() => {
    fn();
  }, TypeError);
  console.log(error.message)
  t.is(error.message, '🦄');
});