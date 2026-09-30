import { useState } from "react"
import "./App.css"

function App() {

  const MY_KEY =  "4649465c" 

  const [movieName, setMovieName] = useState("Avengers")
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  
  async function getMovies() {
    setIsLoading(true)
    setErrMsg("")
    
    try {
      let response = await fetch("https://www.omdbapi.com/?apikey=" + MY_KEY + "&s=" + movieName)
      let result = await response.json()
      console.log(result)

      if (result.Response == "True") {
        setMovieList(result.Search)
      }
      else {
        setErrMsg(result.Error)
        setMovieList([])
      }

    } catch (error) {
      setErrMsg("API")
    }

    setIsLoading(false)
  }

  return (
    <div className="main">
      <h2>Movie Explorer</h2>

      <div>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="movie name"
        />
        <button onClick={getMovies}>Search</button>
      </div>

      {isLoading ? <p>Loading..</p> : null}
      {errMsg ? <p style={{ color: "red" }}>{errMsg}</p> : null}

      <div className="movieBox">
        {
          movieList.map((m) => {
            return (
              <div className="card" key={m.imdbID}>
                <img src={m.Poster} alt="poster" />
                <p><b>{m.Title}</b></p>
                <p>{m.Year}</p>
                <p>⭐ Rating</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default App