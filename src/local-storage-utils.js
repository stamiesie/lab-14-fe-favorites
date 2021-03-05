const USER = 'USER';

export function getUserFromLocalStorage() {
    const user = localStorage.getItem(USER);
    // if there is a user and user has a token...
    try {

        return JSON.parse(user);
    } catch (e) {

        return {
            id: '',
            email: '',
            token: ''
        }
    }
}
// If there is a user in localStorage, the initial state of the user should be the user in localStorage.  If there is no user in localStorage, the initial state should be an empty user (state above).

export function putUserInLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}