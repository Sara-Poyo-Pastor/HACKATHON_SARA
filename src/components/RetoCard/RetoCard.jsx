import { useEffect, useState } from 'react';
import './RetoCard.css';

function RetoCard() {
  const [retos, setRetos] = useState({ Principiante: [], Intermedio: [], Experto: [] });
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const fetchRetos = async () => {
      try {
        const response = await fetch('/data/retos.json');
        
        // Verificar que la respuesta sea válida
        if (!response.ok) {
          throw new Error('Error en la carga de datos');
        }

        const data = await response.json();
        console.log("Fetched Retos Data:", data); // Verifica que los datos se obtienen correctamente
        clasificarRetos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Actualiza el estado de carga
      }
    };

    const clasificarRetos = (data) => {
      const retosPorNivel = { Principiante: [], Intermedio: [], Experto: [] };
      data.forEach((reto) => {
        if (reto.level in retosPorNivel) {
          retosPorNivel[reto.level].push(reto);
        }
      });
      setRetos(retosPorNivel);
    };

    fetchRetos();
  }, []);

  if (loading) {
    return <div>Cargando retos...</div>; // Mensaje de carga
  }

  return (
    <div className="card-container">
      {Object.keys(retos).map((nivel) => (
        <div key={nivel} className="level-section">
          <h2>{nivel}</h2>
          {retos[nivel].length > 0 ? (
            retos[nivel].map((reto, index) => (
              <div key={index} className="cardReto">
                <h3>{reto.title}</h3>
                <p>{reto.description}</p>
              </div>
            ))
          ) : (
            <p>No hay retos disponibles para este nivel.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default RetoCard;





