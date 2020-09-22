import Header from '../components/Header'

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
