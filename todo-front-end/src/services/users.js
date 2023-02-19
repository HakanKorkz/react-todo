import * as request from "services/request";

export const users=()=>request.getFetch("https://jsonplaceholder.typicode.com/users")