import Mynav from '../components/Mynav'
const Mylayout = (props) => (
  <div>
    <Mynav></Mynav>
    {
      props.children
    }
  </div>
)
export default Mylayout