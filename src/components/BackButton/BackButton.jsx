import './BackButton.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BackButton = ({ path }) => {

  return (
	<Link to={path}>
		<button className='Back'>
			Volver al inicio
		</button>
	</Link>
  );
}

BackButton.propTypes = {
    text: PropTypes.string, 
    path: PropTypes.string.isRequired, 
  }

export default BackButton;