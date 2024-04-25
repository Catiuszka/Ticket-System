import { useState } from 'react';
import Login from "../pages/Login.js";

export default function Loader() {
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState(null);

  const fetchJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((data) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <button onClick={fetchJoke}>
        Get Joke
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : joke ? (
        <div>
          <h4>{joke.setup}</h4>
          <p>{joke.punchline}</p>
        </div>
      ) : null}
    </>
  );
}
