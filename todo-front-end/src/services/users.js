import * as request from "services/request"

export const users = () => request.getFetch("https://jsonplaceholder.typicode.com/users")

export const loginFetch = (data) => request.postFetch("/login", data, "DATA")
export const registerFetch = (data) => request.postFetch("/register", data, "DATA")
