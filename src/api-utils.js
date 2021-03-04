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

export async function getCatalog(query) {
    const response = await request
        // append the API specific query
        .get(`${URL}/movies?search=${query}`)
    // would need this is auth is needed in header
    // .set('Authorization', token)

    return response.body;
}