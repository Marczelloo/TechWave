import '../style/Popup.css';
import { usePopup } from './PopupProvider';

type Props = {}

function Popup({}: Props) {
    const { isVisible, content } = usePopup();
    const popupStyle = {
        transform: isVisible ? 'translate(0)' : 'translate(100%)',
    };
    

  return (
    <div className='popup-container' style={popupStyle}>
        <p> { content } </p>
    </div>
  )
}

export default Popup