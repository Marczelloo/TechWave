import Navbar from './Navbar';
import '../style/UnderConstruction.css';

function UnderConstruction() {
  return (
    <div className='wrapper'>
        <Navbar/>
        <div className='underconstruction-container'>
            <h2> Page under construction 🛠️ </h2>
            <h2> We apologize for the inconvienience </h2>
        </div>
    </div>
  )
}

export default UnderConstruction