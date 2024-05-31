<template>
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <p><strong>Release Year:</strong> {{ movie.releaseYear }}</p>
      <p><strong>Studios:</strong> {{ movie.studios }}</p>
      <p><strong>Producers:</strong> {{ movie.producers }}</p>
      <p><strong>Winner:</strong> {{ movie.winner ? 'Yes' : 'No' }}</p>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        movie: null,
      };
    },
    methods: {
      loadMovie(id) {
        api.getMovie(id).then(response => {
          this.movie = response.data;
        });
      },
    },
    mounted() {
      this.loadMovie(this.$route.params.id);
    },
  };
  </script>
  