import { useState, useEffect } from 'react';
import Slider from 'react-slick'; 
import './Card.css'; 

function NewsCard() {
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const apiKey = 'f3d96a28bfb44773912e12f546337f7b'; 
  const query = 'desarrollo web';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error en la red');
        }

        const data = await response.json();
        setArticles(data.articles.slice(0, 10) || []); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles(); 
  }, [url]);


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div className="card" key={index}>
            <h2>{article.title || 'Título del artículo'}</h2> 
            <p>{article.description || 'Descripción del artículo'}</p> 
            <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewsCard;



