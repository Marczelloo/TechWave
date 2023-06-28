import '../style/NavBtn.css';

type Props = {
    heading: string,
    icon: string,
}

function NavBtn({icon, heading}: Props) {
  return (
    <div className='NavBtn'>
        <img className='NavBtn-icon' src={icon} alt={heading}></img>
        <p> {heading} </p>
    </div>
  )
}

export default NavBtn