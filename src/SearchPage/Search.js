import React, { Component } from 'react'
import { getMovies, addFavorite } from '../api-utils.js';

export default class Search extends Component {
    state = {
        search: '',
        results: [],
    }

    handleSearchChange = (e) => this.setState({ search: e.target.value })


    handleSubmit = async (e) => {
        e.preventDefault();

        const results = await getMovies(this.state.search);

        this.setState({ results });
    }

    handleFavoriteClick = async (rawMovie) => {
        await addFavorite({
            title: rawMovie.title,
            popularity: rawMovie.popularity,
            release_date: rawMovie.release_date.slice(0, 4),
            poster: rawMovie.poster_path,
            movie_api_id: rawMovie.id,
        },
            this.props.user.token);
    }

    render() {
        return (
            <div className="movie-result-container">
                <h1>Search Page</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input value={this.state.search} onChange={this.handleSearchChange}></input>
                    </label>
                    <button>Search!</button>
                </form>
                <div>
                    {
                        this.state.results.map((result) =>
                            <div className="movie-result">
                                <h2>{result.title}</h2>
                                <p>Popularity: {result.popularity}</p>
                                <p>Release Date {result.release_date}</p>
                                <img src={`https://image.tmdb.org/t/p/original${result.poster_path}`} alt="movie-poster"></img>
                                <button onClick={() => this.handleFavoriteClick(result)}>Add to Favorites</button>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}
