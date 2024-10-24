import './Registration.css';
import { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import PopUp from '../../components/PopUp/PopUp';
import Select from 'react-select';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    level: '',
    interest: [],
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (selectedOptions) => {
    setFormData({ ...formData, interest: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setPopUpMessage('Las contraseñas no coinciden'); // Actualizar el mensaje del PopUp
      setShowPopUp(true);
      return;
    }

    const userJSON = JSON.stringify({
      name: formData.name,
      last_name: formData.last_name,
      level: formData.level,
      interest: formData.interest.map(option => option.value),
      email: formData.email,
      password: formData.password
    });

    const formDataToSend = new FormData();
    formDataToSend.append('user', userJSON);

    if (profileImage) {
        formDataToSend.append('profile_image', profileImage);
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setPopUpMessage('Registro exitoso');
        setShowPopUp(true);
        window.location.replace('/Login');
      } else {
        setError('Error en el registro');
        setSuccess(false);
        setPopUpMessage('Error en el registro'); 
        setShowPopUp(true);
      }
    } catch (error) {
      setError('Error de red');
      setSuccess(false);
      setPopUpMessage('Error de red'); 
      setShowPopUp(true);
    }
  };

  const handleClosePopUp = () => {
    setShowPopUp(false); 
  };

  const interestOptions = [
    { value: 'frontend', label: 'Front-end' },
    { value: 'backend', label: 'Back-end' },
    { value: 'fullstack', label: 'Full-stack' },
    { value: 'bases', label: 'Bases de datos' },
    { value: 'uiux', label: 'UI-UX' },
  ];

  return (
    <>
      <div className='main-content'>
        <BackButton path='/'></BackButton>
        <div className='welcomeText'>
          <h1 className='greetingRegistration'>Bienvenid@</h1>
          <h4 className='textRegistration'>Ingresa los siguientes datos y crea tu cuenta</h4>
        </div>
        <form className='registrationForm' onSubmit={handleSubmit}>
          <div className='formGroup'>
            <label className='identifier'>Nombre</label>
            <input
              className='registrationBox'
              type=''
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='formGroup'>
            <label className='identifier'>Apellido</label>
            <input
              className='registrationBox'
              type=''
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='formGroup'>
            <label className='identifier'>Nivel de experiencia</label>
            <select
              className='registrationBox'
              name='level'
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value='' disabled>Selecciona tu nivel</option>
              <option value='principiante'>Principiante</option>
              <option value='intermedio'>Intermedio</option>
              <option value='experto'>Experto</option>
            </select>
          </div>
          <div className='formGroup'>
            <label className='identifier'>Áreas de interés</label>
            <Select
              className='registrationBox1'
              name='interest'
              value={formData.interest}
              onChange={handleInterestChange}
              options={interestOptions}
              isMulti
              required
            />
          </div>
          <div className='formGroup'>
            <label className='identifier'>Correo Electrónico</label>
            <input
              className='registrationBox'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='formGroup'>
            <label className='identifier'>Contraseña</label>
            <input
              className='registrationBox'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='formGroup'>
            <label className='identifier'>Confirmar Contraseña</label>
            <input
              className='registrationBox'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className='formGroup'>
            <label className='identifier'>Foto de perfil</label>
            <label htmlFor='fileInput' className='registrationBox' id='regis'>
              Elegir archivo
            </label>
            <input
              id='fileInput'
              type='file'
              onChange={(e) => setProfileImage(e.target.files[0])}
              required
              style={{ display: 'none' }} 
            />
          </div>
          <button className='registrationButton' type='submit'>
            Registrar
          </button>
        </form>
        {showPopUp && (
          <PopUp message={popUpMessage} onClose={handleClosePopUp} />
        )}
      </div>
    </>
  );
}

export default Registration;

