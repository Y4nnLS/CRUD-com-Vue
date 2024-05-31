<template>
    <div>
      <h2>{{ movie.id ? 'Edit Movie' : 'Add Movie' }}</h2>
      <form @submit.prevent="saveMovie">
        <div>
          <label>Title</label>
          <input v-model="movie.title" required />
        </div>
        <div>
          <label>Release Year</label>
          <input v-model="movie.releaseYear" type="number" required />
        </div>
        <div>
          <label>Studios</label>
          <input v-model="movie.studios" required />
        </div>
        <div>
          <label>Producers</label>
          <input v-model="movie.producers" required />
        </div>
        <div>
          <label>Winner</label>
          <input type="checkbox" v-model="movie.winner" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        movie: {
          title: '',
          releaseYear: '',
          studios: '',
          producers: '',
          winner: false,
        },
      };
    },
    methods: {
      saveMovie() {
        if (this.movie.id) {
          api.updateMovie(this.movie.id, this.movie).then(() => {
            this.$router.push({ name: 'MovieList' });
          });
        } else {
          api.createMovie(this.movie).then(() => {
            this.$router.push({ name: 'MovieList' });
          });
        }
      },
      loadMovie(id) {
        api.getMovie(id).then(response => {
          this.movie = response.data;
        });
      },
    },
    mounted() {
      if (this.$route.params.id) {
        this.loadMovie(this.$route.params.id);
      }
    },
  };
  </script>
  