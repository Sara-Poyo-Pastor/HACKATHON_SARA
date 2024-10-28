import './Principal.css'
import Card from '../../components/Card/Card';
import Questions from '../../components/Questions/Questions';
import YoutubeCard from '../../components/YoutubeCard/YoutubeCard';
import RetoCard from '../../components/RetoCard/RetoCard'

function Principal() {
    
    return(
        <>
            <div className='emptyBox'></div>
            <div className='text'>
                <h1 className='greetingTextUser'>¡Hola!</h1>
            </div>
            
                <div className='title'>Retos</div>
                <div className='retosContainer'>
                <RetoCard/>
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