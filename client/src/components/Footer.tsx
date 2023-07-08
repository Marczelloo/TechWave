import '../style/Footer.css';
import { Link } from 'react-router-dom';

import phone_img  from '../assets/phone.png';
import mail_img from '../assets/mail.png';
import location_img from '../assets/location.png';
import whatsapp_img from '../assets/whatsapp.png';
import instagram_img from '../assets/instagram.png';
import youtube_img from '../assets/youtube.png';
import facebook_img from '../assets/facebook.png';
import twitter_img from '../assets/twitter.png';

import temp from '../assets/temp_logo.webp';

type Props = {}

function Footer({}: Props) {
  return (
    <div className='footer-container'>
        <div className='upper-section'>
            <div className='column-section'>
                <h4> Shipping </h4>
                <Link to="./"> Shipping </Link>
                <Link to="./"> Unstalments </Link>
                <Link to="./"> Leasing </Link>
                <Link to="./"> Insurances </Link>
                <Link to="./"> Assembly  </Link>
                <Link to="./"> Returns and Complaints </Link>
                <Link to="./"> FAQ </Link>
            </div>
            <div className='column-section'>
                <h4> Offers and inspirations </h4>
                <Link to="./"> Sale </Link>
                <Link to="./"> HotDeals </Link>
                <Link to="./"> Offers </Link>
                <Link to="./"> Gift Cards </Link>
                <Link to="./"> Guides  </Link>
            </div>
            <div className='column-section'>
                <h4> Techwave </h4>
                <Link to="./"> About Us</Link>
                <Link to="./"> Rules and Regulations</Link>
                <Link to="./"> Privacy Policy </Link>
                <Link to="./"> Cookies Policy </Link>
                <Link to="./"> Implemented projects</Link>
                <Link to="./"> Press office </Link>
                <Link to="./"> Public orders</Link>
                <Link to="./"> Shopping for companies</Link>
                <Link to="./"> Marketing cooperation</Link>
                <Link to="./"> Forum </Link>
                <Link to="./"> Career </Link>
                <Link to="./"> Contact </Link>
                <Link to="./"> Rules and Regulations</Link>
            </div>
            <div className='column-section'>
                <h4> Contact </h4>
                <div className='column-element'>
                    <div className='contact-phone'>
                        <img src={phone_img} alt='contact phone number'></img>
                        <p> 10 33 127 75</p>
                    </div>
                    <div className='phone-hours'>
                        <p> Mon. - Fri. 8:00 - 22:00 </p>
                        <p> Sat. - Sun. 8:00 - 17:00 </p>
                    </div>
                </div>
                <div className='column-element'>
                    <div className='contact'>
                        <img src={mail_img} alt='contact email address'></img>
                        <p> techwave@techwave.com</p>
                    </div>
                </div>
                <div className='column-element'>
                    <div className='contact'>
                        <img src={whatsapp_img} alt='contact email address'></img>
                        <Link to='./'> Whatsapp </Link>
                    </div>
                </div>
                <div className='column-element'>
                    <div className='contact'>
                        <img src={location_img} alt='contact email address'></img>
                        <Link to='./'> Our Shops </Link>
                    </div>
                </div>
                <div className='media-element'>
                    <a href="https://www.instagram.com">
                        <img src={instagram_img} alt='instagram icon'></img>
                    </a>
                    <a href="https://www.twitter.com">
                        <img src={twitter_img} alt='twitter icon'></img>
                    </a>
                    <a href="https://www.facebook.com">
                        <img src={facebook_img} alt='facebook icon'></img>
                    </a>
                    <a href="https:///www.youtube.com">
                        <img src={youtube_img} alt='youtube icon'></img>  
                    </a>
                </div>
            </div>
        </div>
        <div className='lower-section'>
            <div className='partners-container'>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>
                <img src={temp} alt='temp logo'></img>         
            </div>
            <div className='name-container'>
                <p> © techwave - 2023</p>
            </div>
        </div>
    </div>
  )
}

export default Footer