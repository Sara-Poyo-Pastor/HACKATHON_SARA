import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation().pathname;

  if (location === '/PrivacyTerms') {
    return null; 
  }

  return (
    <div className="footer">
      <Link className='link1' to="PrivacyTerms"><p>Privacy policy</p></Link>
      <Link className='link1' to="PrivacyTerms"><p>Terms and Conditions</p></Link>
    </div>
  );
}

export default Footer;