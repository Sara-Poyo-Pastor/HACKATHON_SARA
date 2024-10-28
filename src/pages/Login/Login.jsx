import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import BackButton from '../../components/BackButton/BackButton';
import { login } from '../../../src/services/conection';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.message === 'Inicio de sesión exitoso') {
        console.log('Inicio de sesión exitoso.');
        navigate('/Principal');
        setEmail('');
        setPassword('');
      } else {
        console.error('Error al iniciar sesión:', response.message);
      }
    } catch (error) {
      console.error('Error en la función de inicio de sesión:', error.message);
    }
  };

  return (
    <>
      <BackButton path="/" />
      <main className="login-container">
        <div className="welcomeTextLogin">
          <h1 className="greetingLogin">Bienvenid@</h1>
          <h4 className="textLogin">Escribe tu correo para ingresar</h4>
        </div>
          <h2 className="loginTitle">Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Correo electrónico"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Contraseña"
                required
              />
            </div>
            <button className="loginButton" type="submit">Iniciar sesión</button>
          </form>
      </main>
    </>
  );
}

export default Login;
