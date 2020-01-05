import test from 'ava'

const testfn = (a, b) => a + b

const testfnPromise = (a, b) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

test('hello ava', t => {
  t.pass()
})

// expect in ava
test('my first test of ava assertion', async t => {
  const str = 'hello ava!'
  t.is(str, 'hello ava!')
})

// test of add method
test('add method test', async t => {
  const result = testfn(3, 4)
  t.is(result, 7)
})

// test of add method
test.failing('add method testPromise', async t => {
  const result = await testfnPromise(3, 4)
  t.is(result, 7)
})