import './Registration.css';
import { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import { register } from '../../services/conection';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearForm = () => {
    setName('');
    setLastname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await register(name, lastname, email, password);

      if (response && response.message === 'Usuario creado exitosamente') {
        alert(response.message);
        clearForm();
        navigate('/Login');  // Navegación a la ruta /Login en caso de éxito
      } else {
        setErrorMessage(response.message || 'Respuesta no válida desde la API.');
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Error al registrar usuario.");
    }
  };

  return (
    <>
      <BackButton path="/" />
      <div className="registrationForm">
        <h2 className="signUpTitle">Regístrate</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Nombre"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="lastname">Apellidos:</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              aria-label="Apellidos"
              required
            />
          </div>
          <div className="field">
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
          <div className="field">
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
          <div className="field">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-label="Confirmar contraseña"
              required
            />
          </div>
          <button className="registrationButton" type="submit">Registrar</button>
        </form>
      </div>
    </>
  );
}

export default Registration;
