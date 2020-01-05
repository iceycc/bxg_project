function foo(param) {
  console.log(param[0])
}

// foo('hello');
// foo`nihao`;
foo`
  <div>nihao</div>
  <div>hello</div>
`;

// 标签模板：可以作为函数调用的参数
