import './Button2.css'
import PropTypes from 'prop-types';
	import { Link } from 'react-router-dom';

const Button2 = ({ text, path }) => {

  return (
	<Link to={path}>
		<button className='Button2'>
			{text}
		</button>
	</Link>
  );
}

Button2.propTypes = {
    text: PropTypes.string.isRequired, 
    path: PropTypes.string.isRequired, 
  }

export default Button2;