// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Altere para o URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getMovies(params) {
    return apiClient.get('/movies', { params });
  },
  getMovie(id) {
    return apiClient.get(`/movies/${id}`);
  },
  createMovie(movie) {
    return apiClient.post('/movies', movie);
  },
  updateMovie(id, movie) {
    return apiClient.put(`/movies/${id}`, movie);
  },
  deleteMovie(id) {
    return apiClient.delete(`/movies/${id}`);
  },
};
