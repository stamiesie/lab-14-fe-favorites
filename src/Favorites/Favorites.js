import React, { Component } from 'react'
import { getFavorites } from '../api-utils.js';

export default class Favorites extends Component {

    state = {
        favorites: [],
    }
    // on load, call GET function to retrieve all of user's favs using their token
    componentDidMount = async () => {
        const favorites = await getFavorites(this.props.token);

        this.setState({ favorites })
    }

    render() {
        return (
            <div>
                <h1>Favorites</h1>
                <div>
                    {
                        this.state.favorites.map((fave) =>
                            <div className="movie-result">
                                <h2>{fave.title}</h2>
                                <p>Popularity: {fave.popularity}</p>
                                <p>Release Date {fave.release_date}</p>
                                <img src={`https://image.tmdb.org/t/p/original${fave.poster}`} alt={fave.title}></img>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}
