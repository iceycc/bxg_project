import Son from '../../components/Son'
const TestStyle = () => (
  <div>
    <h1>styled-jsx演示</h1>
    <Son></Son>
    {/* 如果添加了 jsx属性，只作用于当前组件，不包括子组件 */}
    {/* global作用于当前组件，包括子组件 */}
    <style jsx global>{`
      h1 {
        color: red;
      }
      `}</style>
  </div>
)
export default TestStyle