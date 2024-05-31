<template>
    <div>
      <input v-model="searchQuery" @input="fetchMovies" placeholder="Search by title" />
  
      <table>
        <thead>
          <tr>
            <th @click="sortBy('title')">Title</th>
            <th>Release Year</th>
            <th>Studios</th>
            <th>Producers</th>
            <th>Winner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.releaseYear }}</td>
            <td>{{ movie.studios }}</td>
            <td>{{ movie.producers }}</td>
            <td>{{ movie.winner ? 'Yes' : 'No' }}</td>
            <td>
              <button @click="editMovie(movie.id)">Edit</button>
              <button @click="deleteMovie(movie.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <pagination :total="total" :page="page" @page-changed="fetchMovies" />
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  import Pagination from './Pagination.vue';
  
  export default {
    components: { Pagination },
    data() {
      return {
        movies: [],
        searchQuery: '',
        sortKey: 'title',
        sortAsc: true,
        page: 1,
        total: 0,
      };
    },
    methods: {
      fetchMovies() {
        const params = {
          q: this.searchQuery,
          sort: this.sortKey,
          order: this.sortAsc ? 'asc' : 'desc',
          page: this.page,
        };
        api.getMovies(params).then(response => {
          this.movies = response.data.items;
          this.total = response.data.total;
        });
      },
      sortBy(key) {
        this.sortKey = key;
        this.sortAsc = !this.sortAsc;
        this.fetchMovies();
      },
      editMovie(id) {
        this.$router.push({ name: 'EditMovie', params: { id } });
      },
      deleteMovie(id) {
        api.deleteMovie(id).then(() => {
          this.fetchMovies();
        });
      },
    },
    mounted() {
      this.fetchMovies();
    },
  };
  </script>
  