import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function ChuckNorris() {
  //use States for storing the data
  const [jokes, setJokes] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //https://api.chucknorris.io/jokes/random //API URL where we'll get the data from
  //useEffect to fetch the data from the API
  useEffect(() => {
    const fetchJokes = async () => {
    const fetchedJokes=[];
    for(let i=0; i<3; i++)
    {
      fetch('https://api.chucknorris.io/jokes/random')
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        fetchedJokes.push(data.value);
      })
      .catch(()=>console.log('Error fetching data, no jokes available :C'));
    };
    setJokes(fetchedJokes);
  };
  fetchJokes();
  }, []);

  //filtering jokes with the input
  const filteredJokes=jokes.filter((joke)=>
    joke.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Chuck Norris Jokes! :)</h1>
        <h4>Filter of Jokes:</h4>
        <input
          type="text"
          value={filter}
          placeholder='Search a keyword for a joke'
          onChange={(e) => setFilter(e.target.value)}
          style={{width: "75%"}}
        />
        <br/>
        {isLoading ? 
          <p>Fetching the best Chuck Norris jokes...</p>
          :
          <div>
            <table border={1} style={{textAlign: "center", margin: "10px"}}>
              <thead>
                <tr>
                  <th>The best Chuck Norris Jokes :D</th>
                </tr>
              </thead>
              <tbody>
                {filteredJokes.length > 0 ?
                  filteredJokes.map((joke, index)=>(
                    <tr key={index}>
                      <td>{joke}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td>No Jokes available :c</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        }
      </header>
    </div>
  );
}

export default ChuckNorris;
