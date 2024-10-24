import './Principal.css'
import Card from '../../components/Card/Card';
import Questions from '../../components/Questions/Questions';
import YoutubeCard from '../../components/YoutubeCard/YoutubeCard';

function Principal() {
    const userName = localStorage.getItem('user_name');

    return(
        <>
            <div className='emptyBox'></div>
            <div className='text'>
                <h1 className='greetingTextUser'>¡Hola, {userName ?` ${userName}` : ''}!</h1>
            </div>
            <div>
                <div className='title'>Retos</div>
                <Card/>
            </div>
            <div>
                <div className='title'>¿Estás al día?</div>
                <Card/>
            </div>
            <YoutubeCard/>
            <div><Questions/></div>
            
            
        </>
    )
}

export default Principal;