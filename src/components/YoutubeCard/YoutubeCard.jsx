import { useEffect, useState } from 'react';
import './YoutubeCard.css'

const YoutubeCard = () => {
  const [videos, setVideos] = useState([]);
  const [keyword, setKeyword] = useState('desarrollo web'); // Palabra clave por defecto
  const apiKey = 'AIzaSyCbG4m0ZNHPq4aoLXHJfBNQbI1fmRFiyts'; 
  const channelId = 'UC3aj05GEEyzdOqYM5FLSFeg'; 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&q=${encodeURIComponent(keyword)}&order=date&part=snippet,id&maxResults=10`);
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [keyword]); // Ahora fetchVideos se ejecutará cada vez que cambie `keyword`

  return (
    <div>
      <h2 className='title'>¿Te hace falta información? Aquí tienes tutoriales...</h2>
      <input 
        type="text" 
        placeholder="Buscar videos..." 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="video-container">
        {videos.length > 0 ? (
          videos.map(video => (
            <div key={video.id.videoId} className="video-card">
              <h3>{video.snippet.title}</h3>
              <iframe
                width="300"
                height="200"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ))
        ) : (
          <p>No se encontraron videos.</p>
        )}
      </div>
    </div>
  );
};

export default YoutubeCard;

