import Link from 'next/link'
const Mynav = () => (
  <div>
    <Link href={{pathname: '/next-route/teacher'}}>
      <a style={{marginRight: '20px'}}>teacher</a>
    </Link>
    <Link href={{pathname: '/next-route/student'}}>
      <a style={{marginRight: '20px'}}>student</a>
    </Link>
  </div>
)
export default Mynav