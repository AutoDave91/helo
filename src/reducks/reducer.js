import axios from 'axios';

const initialState = {
    username: '',
    user: [],
    posts: [],
    searchPosts: []
}

const HANDLE_UPDATE_USER = 'HANDLE_UPDATE_USER';
const GET_POSTS = "GET_POSTS";
const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";
const GET_USER = 'GET_USER';
const LOGOUT = 'LOGOUT';

export const handleUpdateUser = (user) => {
    console.log('hit')
    return {
        type: HANDLE_UPDATE_USER,
        payload: user
    }
}
export function getPosts(posts) {
    return {
        type: GET_POSTS,
        payload: posts
    }
}
export function getSearch(posts) {
    return {
        type: GET_SEARCH_RESULTS,
        payload: posts
    }
}
export const getUser = ()=>{
    return{
        type: GET_USER,
        payload: axios.get('/auth/user')
    }
}
export const logout = ()=>{
    let data = axios.get('/auth/logout')
    return{
        type: LOGOUT,
        payload: data
    }
}

function reducer(state=initialState,action) {
    const { type, payload } = action

    switch(type) {
        case HANDLE_UPDATE_USER:
            return { ...state, user: payload }
        case `${GET_USER}_FULLFILLED`:
            return {...state, user: action.payload.data}
        case `${LOGOUT}_FULLFILLED`:
            return {...state, user: action.payload.data}
        default: return state
    }
}

export default reducer;