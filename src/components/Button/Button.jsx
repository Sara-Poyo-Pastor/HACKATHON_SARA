import './Button.css'
// import recorder from "../../assets/Image_recorder.png";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Button() {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioStream, setAudioStream] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const navigate = useNavigate();

    const startRecording = async () => {
        try {
            stopRecording();

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const audioChunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunks.push(e.data);
                }
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                
                try {
                    let formData = new FormData();
                    formData.append('blob_data', audioBlob);

                    const token = localStorage.getItem('token'); 

                    let response = await fetch('http://localhost:8000/audios', {
                        method: 'POST',
                        headers:{
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData
                    });

                    if (response.ok) {
                        let data = await response.json();
                        let audioID = data.id;
                        navigate(`/LabelResults/${audioID}`); //pasamos el id del audio al componente LabelResults
                        console.log("Audio enviado para analizar:", data);
                    } else {
                        console.error("Error al enviar el audio:", await response.text());
                    }
                } catch (error) {
                    console.error('Error al enviar el audio para analizar:', error);
                }
            };

            recorder.start();
            setAudioStream(stream);
            setMediaRecorder(recorder);
        } catch (error) {
            console.error('Error al iniciar la grabación:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            audioStream.getTracks().forEach((track) => track.stop());
        }
    }

    const playAudio = () => {
        if (audioUrl) {
            const audioElement = new Audio(audioUrl);
            audioElement.play();
        }
    }

    return (
        <>
            <div className='buttonsBody'>
                <button className='recordButton' onClick={mediaRecorder && mediaRecorder.state === 'recording' ? stopRecording : startRecording}>
                    {mediaRecorder && mediaRecorder.state === 'recording' ? 'DETENER GRABACIÓN' : 'PULSAR PARA GRABAR'}
                    {/* <img src={recorder} alt='Icon recorder' /> */}
                </button>
                <button className='playButton' onClick={playAudio} disabled={!audioUrl}>
                    Reproducir grabación
                </button>
                {audioUrl && <a href={audioUrl} download="recordedAudio.wav">Descargar Audio</a>}
            </div>
        </>
    );
}

export default Button;