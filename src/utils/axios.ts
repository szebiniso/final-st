import axios from 'axios'

const baseURL = process.env.REACT_APP_API

export const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})
