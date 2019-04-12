import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.css'

const Layout = props => (
  <div>
    <div className='container'>
      <Header />
    </div>
    <div className='container'>
      {props.children}
    </div>
  </div>
)

export default Layout
