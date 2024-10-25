import { useEffect, useState } from 'react';
import './Questions.css';

const Questions = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const userName = localStorage.getItem('user_name');

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question) return; // No permitir preguntas vacías

    const newPost = {
      id: Date.now(),
      question: question,
      answers: [],
      author: userName,
      date: new Date().toLocaleString(),
    };

    setPosts([...posts, newPost]);
    setQuestion('');
  };

  const handleAnswerSubmit = (postId) => {
    if (!answer) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          answers: [...post.answers, { text: answer, author: userName, date: new Date().toLocaleString() }] 
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setAnswer('');
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleDeleteAnswer = (postId, answerIndex) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          answers: post.answers.filter((_, index) => index !== answerIndex) 
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onloadend = () => {
          setQuestion((prev) => prev + `![Image](${reader.result})`); // Inserta la imagen en el textarea como un marcador
        };
        reader.readAsDataURL(file);
        e.preventDefault(); // Prevenir la acción de pegar texto
        return;
      }
    }
  };

  return (
    <div>
      <h2>Foro de Preguntas y Respuestas</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Escribe tu pregunta o pega una imagen aquí"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          rows={4}
          style={{ width: '100%' }}
          onPaste={handlePaste} // Maneja el evento de pegar
        />
        <button type="submit">Agregar Pregunta</button>
      </form>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.question}</h3>
              <p>Pregunta por: {post.author} - {post.date}</p>
              <button onClick={() => handleDeletePost(post.id)}>Eliminar Pregunta</button>
              <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(post.id); }}>
                <input
                  type="text"
                  placeholder="Escribe tu respuesta"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
                <button type="submit">Agregar Respuesta</button>
              </form>
              <div>
                {post.answers.length > 0 && (
                  <div>
                    <h4>Respuestas:</h4>
                    {post.answers.map((ans, index) => (
                      <div key={index}>
                        <p>{ans.text} - Respuesta por: {ans.author} - {ans.date}</p>
                        <button onClick={() => handleDeleteAnswer(post.id, index)}>Eliminar Respuesta</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;

