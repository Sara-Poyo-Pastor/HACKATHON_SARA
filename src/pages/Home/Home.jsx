import './home.css'
import Button from '../../components/Button/Button';
import Button2 from '../../components/Button2/Button2';
import logo from '../../assets/logo.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const NotLogged = () =>
{
	return (
		<>
          <div className='overheadSpace'></div>
          <main className='contentHome'>
            <div className='homeimage'><img className='logohome' src={logo} alt="Hackafun" /></div>  
				<Button2 text="Login" path='/login'/>
				<Button2 text="Sign Up" path='/registration'/>    
          </main>  
          <div className='spaceBelow'></div>
        </>
	)
}

const UserView = () =>
{
	return(
		<>
			<div className='text'>
				<h1 className='greetingTextUser'>¡Hola!</h1>
				<h4 className='textUser'>Ya puedes grabar tu audio</h4>
			</div>
			<Button />
		</>
	)
}
const Home = () => {

	const [isUser, setIsUser] = useState();
	let {user} = useParams();

	const showHome = () =>
	{
		setIsUser(user);
	}

	useEffect(() =>
	{
		showHome();
	})

  return (
		<>
			{isUser !== undefined ? 
				(<UserView />)
				:
				(<NotLogged />)
			}
		</>
  );
}

export default Home;