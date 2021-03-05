import React, { Component } from 'react'
import { getMovies, addFavorite, getFavorites } from '../api-utils.js';

export default class Search extends Component {
    state = {
        search: '',
        results: [],
        favorites: [],
    }

    // on load, set the users favorites already in their account.  If they're not logged in, prevent from adding to favorites.
    componentDidMount = async () => {
        if (this.props.token) await this.fetchFavorites();
    }

    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.user.token);

        this.setState({ favorites })
    }

    // if a movie is already in favorites, don't include it in the search
    isAFavorite = (movie) => {
        // do this using .find to match the movie id to the movie_api_id
        const isInFaves = this.state.favorites.find(favorite => favorite.movie_api_id === movie.id)

        return Boolean(isInFaves);
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
            poster: rawMovie.poster_path || 'http://placekitten.com/300/300',
            movie_api_id: rawMovie.id,
        },
            this.props.user.token);

        // after a movie has been added to favorites, fetch new state of favorites to update page
        await this.fetchFavorites();
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
                                {/* render 'if already on your faves list, no button, otherwise show add to faves button */}
                                <p>{this.isAFavorite(result) ? 'On Favorites List!' : <button onClick={() => this.handleFavoriteClick(result)}>Add to Favorites</button>}</p>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}
