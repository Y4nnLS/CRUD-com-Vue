import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  createMovie(movie) {
    return api.post('/movies/add', movie);
  },
  updateMovie(id, movie) {
    return api.put(`/movies/${id}/update`, movie);
  },
  getFilme(id) {
    return api.get(`/movies/${id}`);
  },
  getAllMovies() {
    return api.get('/movies');
  },
  deleteMovie(id) {
    return api.delete(`/movies/${id}/delete`);
  }
};
