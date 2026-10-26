import io from 'socket.io-client';


export const api = "https://pfe-backend-gvrh.onrender.com"
//http://localhost:3001
export const socketApi = "http://localhost:8001"

export const socket = io(socketApi);
