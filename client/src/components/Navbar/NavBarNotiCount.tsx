import '../../style/Navbar/NavBarNotiCount.css';

type Props = {
    count: number,
}

function NavBarNotiCount({ count }: Props) {
  return (
    <div className='navbar-notification-count'>
        <p> {count} </p>
    </div>
  )
}

export default NavBarNotiCount