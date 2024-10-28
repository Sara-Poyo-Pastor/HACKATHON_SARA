import './home.css'
import Button2 from '../../components/Button2/Button2';
import logo from '../../assets/logo.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const NotLogged = () =>
{
	return (
		<>
          <main className='contentHome'>
            <div className='homeimage'><img className='logohome' src={logo} alt="Hackafun" /></div>  
				<Button2 text="Login" path='/login'/>
				<Button2 text="Sign Up" path='/registration'/>    
          </main>  
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
				(<Home />)
				:
				(<NotLogged />)
			}
		</>
  );
}

export default Home;