import Link from 'next/link'

const Header = () => (
  <ul className='nav'>
    <li className='nav-item'>
      <Link href='/' className='nav-link'>Home</Link>
    </li>
    <li className='nav-item'>
      <Link href='/about' className='nav-link'>About</Link>
    </li>
  </ul>
)

export default Header
