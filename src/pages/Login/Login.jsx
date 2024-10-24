import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import PopUp from '../../components/PopUp/PopUp'
import BackButton from '../../components/BackButton/BackButton';

function Login() 
{
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
  
  const [error, setError] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

  const handleClosePopUp = () => {
    setShowPopUp(false);
  }
	
	const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: formData.username,
                password: formData.password
            })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); // Guardar el token en el LocalStorage
          localStorage.setItem('user_name', formData.username);
          localStorage.setItem('user_id', data.user.id)
          localStorage.setItem('user_avatar_url', data.user.profile_image)
          setError(null);
        setShowPopUp(false);
        navigate('/UserView');
      } else {
        setError("Credenciales incorrectas");
        setShowPopUp(true); 
      }
    } catch (err) {
      setError('Error de red o el servidor no está disponible');
      setShowPopUp(true);
    }
  };
        
	return(
		<>
    <BackButton path='/'></BackButton>
			<main className='login-container'>
				<div className='welcomeTextLogin'>
					<h1 className='greetingLogin'>Bienvenid@</h1>
					<h4 className='textLogin'>Escribe tu correo para ingresar</h4>
				</div>
			
        <form className='loginForm' onSubmit={handleSubmit}>
            <div className='registrationLogin'>
              <label className='identifierLogin'>Nombre de usuario</label>
              <input className='dataLogin'
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
            <div className='registrationLogin'>
              <label className='identifierLogin'>Contraseña</label>
              <input className='dataLogin'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                autoComplete='current-password'
                required
              />
            </div>
			<button className='loginButton' type='submit'>Iniciar sesión</button>
        </form>
			</main>
      {showPopUp && (
        <PopUp message={error} onClose={handleClosePopUp} />
      )}
    </>
	)
}
export default Login;