import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Mantenha o mesmo URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getMovies(params) {
    return apiClient.get('/movies', { params }); // Alterado para '/movies'
  },
  getMovie(id) {
    return apiClient.get(`/movies/${id}`); // Alterado para '/movies/:id'
  },
  createMovie(movie) {
    return apiClient.post('/movies/add', movie); // Alterado para '/movies/add'
  },
  updateMovie(id, movie) {
    return apiClient.put(`/movies/${id}/update`, movie); // Alterado para '/movies/:id/update'
  },
  deleteMovie(id) {
    return apiClient.delete(`/movies/${id}/delete`); // Alterado para '/movies/:id/delete'
  },
};
