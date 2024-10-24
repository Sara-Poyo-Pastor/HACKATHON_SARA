import { useEffect, useState } from 'react';
import './Questions.css';

const Questions = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editPostId, setEditPostId] = useState(null);
  const [editAnswerIndex, setEditAnswerIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question) return;

    const currentDate = new Date().toLocaleString(); // Obtiene la fecha y hora actual

    if (editPostId !== null) {
      setPosts(posts.map(post => 
        post.id === editPostId ? { ...post, question: question, date: currentDate } : post
      ));
      setEditPostId(null);
    } else {
      const newPost = {
        id: Date.now(),
        question: question,
        answers: [],
        date: currentDate // Almacena la fecha y hora de la publicación
      };
      setPosts([...posts, newPost]);
    }
    setQuestion('');
  };

  const handleAnswerSubmit = (postId) => {
    if (!answer) return;

    const currentDate = new Date().toLocaleString(); // Obtiene la fecha y hora actual

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedAnswers = post.answers.map((ans, index) => 
          index === editAnswerIndex ? { text: answer, date: currentDate } : ans
        );

        return { ...post, answers: editAnswerIndex !== null ? updatedAnswers : [...post.answers, { text: answer, date: currentDate }] };
      }
      return post;
    });

    setPosts(updatedPosts);
    setAnswer('');
    setEditAnswerIndex(null);
  };

  const handleEditPost = (post) => {
    setQuestion(post.question);
    setEditPostId(post.id);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditAnswer = (postId, index) => {
    const post = posts.find(post => post.id === postId);
    setAnswer(post.answers[index].text);
    setEditAnswerIndex(index);
  };

  const handleDeleteAnswer = (postId, index) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedAnswers = post.answers.filter((_, ansIndex) => ansIndex !== index);
        return { ...post, answers: updatedAnswers };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div>
      <h2 className='title'>Foro de Preguntas y Respuestas</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu pregunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button className='add' type="submit">{editPostId !== null ? 'Editar Pregunta' : 'Agregar Pregunta'}</button>
      </form>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.question}</h3>
              <p><small>Publicado el: {post.date}</small></p> {/* Muestra la fecha y hora */}
              <button onClick={() => handleEditPost(post)}>Editar</button>
              <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
              <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(post.id); }}>
                <input
                  type="text"
                  placeholder="Escribe tu respuesta"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
                <button type="submit">{editAnswerIndex !== null ? 'Editar Respuesta' : 'Agregar Respuesta'}</button>
              </form>
              <div>
                {post.answers.length > 0 && (
                  <div>
                    <h4>Respuestas:</h4>
                    {post.answers.map((ans, index) => (
                      <div key={index}>
                        <p>{ans.text}</p>
                        <p><small>Respuesta el: {ans.date}</small></p> 
                        <button onClick={() => handleEditAnswer(post.id, index)}>Editar</button>
                        <button onClick={() => handleDeleteAnswer(post.id, index)}>Eliminar</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className='nothing'>No hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;
