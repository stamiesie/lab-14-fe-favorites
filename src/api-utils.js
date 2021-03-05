import request from "superagent";

// swap out localhost link with heroku db link here
const URL = 'http://localhost:3000';


export async function signupUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signup`)
        .send({
            email: email,
            password: password

        })
    return response.body;
}

export async function loginUser(email, password) {
    const response = await request
        .post(`${URL}/auth/signin`)
        .send({
            email: email,
            password: password
        })
    return response.body;
}

export async function getMovies(query) {
    const response = await request
        // append the API specific query
        .get(`${URL}/movies?search=${query}`)

    // would need this auth if needed in header
    // .set('Authorization', token)

    // data is in [results] in API
    return response.body.results;
}

export async function addFavorite(movieObj, token) {
    const response = await request
        .post(`${URL}/api/favorites`)
        // protected route
        .set('Authorization', token)
        .send(movieObj)

    return response.body;
}

export async function getFavorites(token) {
    const response = await request
        .get(`${URL}/api/favorites`)
        .set('Authorization', token)

    return response.body;
}

export async function deleteFavorite(movieId, token) {
    const response = await request
        .put(`${URL}/api/favorites/${movieId}`)
        .set('Authorization', token)

    return response.body;
}

