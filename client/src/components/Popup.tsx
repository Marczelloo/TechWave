import '../style/Popup.css';

type Props = {
    visible: boolean,
    info: string | null,
}

function Popup({ visible, info }: Props) {
    const popupStyle = {
        transform: visible ? 'translate(0)' : 'translate(100%)',
    };

  return (
    <div className='popup-container' style={popupStyle}>
        <p> { info } </p>
    </div>
  )
}

export default Popup