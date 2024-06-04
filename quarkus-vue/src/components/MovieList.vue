<template>
  <div>
    <input
      v-model="searchQuery"
      @input="fetchMovies"
      placeholder="Search by title"
    />

    <table v-if="filteredAndPaginatedMovies.length > 0">
      <thead>
        <tr>
          <th @click="sortBy('releaseYear')">Ano</th>
          <th @click="sortBy('title')">Título</th>
          <th>Prêmio</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(movie, index) in filteredAndPaginatedMovies"
          :key="index"
          :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }"
        >
          <td>{{ movie.releaseYear }}</td>
          <td>{{ movie.title }}</td>
          <td>{{ movie.winner ? "Sim" : "Não" }}</td>
          <td>
            <button @click="editMovie(movie.id)">Edit</button>
            <button @click="deleteMovie(movie.id, movie.title)">Delete</button>
            <button @click="showMovieInfo(movie)">Info</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Nenhum filme encontrado.</div>

    <!-- Popup para exibir informações do filme -->
    <div class="modal" v-if="selectedMovie">
      <div class="modal-content">
        <span class="close" @click="closePopup">&times;</span>
        <!-- Usando o componente Movie para exibir informações do filme -->
        <Movie :movie="selectedMovie" />
      </div>
    </div>

    <!-- Paginação -->
    <Pagination
      :total="total"
      :page="page"
      @page-changed="handlePageChange"
      :per-page="perPage"
    />
  </div>
</template>

<script>
import api from "../services/api";
import Pagination from "./Pagination.vue";
import Movie from "./Movie.vue";

export default {
  components: { Pagination, Movie },
  data() {
    return {
      activeAddJogoModal: false,
      movies: [],
      searchQuery: "",
      sortKey: "releaseYear",
      sortAsc: true,
      page: 1,
      total: 0,
      perPage: 10,
      selectedMovie: null,
    };
  },
  computed: {
    filteredMovies() {
      let movies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sortKey) {
        movies.sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] < b[this.sortKey]) {
            result = -1;
          } else if (a[this.sortKey] > b[this.sortKey]) {
            result = 1;
          }
          return this.sortAsc ? result : -result;
        });
      }

      return movies;
    },
    filteredAndPaginatedMovies() {
      const startIndex = (this.page - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredMovies.slice(startIndex, endIndex);
    },
  },
  methods: {
    fetchMovies() {
      const params = {
        q: this.searchQuery,
        sort: this.sortKey,
        order: this.sortAsc ? "asc" : "desc",
        page: this.page,
        per_page: this.perPage,
      };

      api
        .getAllMovies(params)
        .then((response) => {
          let filmesString = "";
          if (typeof response.data === "string") {
            filmesString = response.data;
          } else {
            filmesString = JSON.stringify(response.data);
          }

          const filmesArray = JSON.parse(filmesString);

          this.movies = filmesArray.map((filme) => {
            return {
              id: filme.id,
              releaseYear: filme.releaseYear,
              title: filme.title,
              winner: filme.winner,
              studio: filme.studios,
              producers: filme.producers,
            };
          });

          if (response.headers["x-total-count"]) {
            this.total = parseInt(response.headers["x-total-count"], 10);
          } else {
            this.total = this.filteredMovies.length;
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar filmes:", error);
        });
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
      this.fetchMovies();
    },
    editMovie(id) {
      this.$router.push({ name: "editMovie", params: { id } });
    },
    deleteMovie(id, title) {
      api.deleteMovie(id).then(() => {
        this.fetchMovies();
      });
      alert("Filme ''" + title +"'' excluído com sucesso!!");
    },
    showMovieInfo(movie) {
      this.selectedMovie = {
        id: movie.id,
        title: movie.title,
        releaseYear: movie.releaseYear,
        studios: movie.studio,
        producers: movie.producers,
        winner: movie.winner,
      };
    },
    closePopup() {
      this.selectedMovie = null;
    },
    handlePageChange(page) {
      this.page = page;
      this.fetchMovies();
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style>
.even-row {
  background-color: #696969;
}
.odd-row {
  background-color: #434343;
}
/* Estilos para o popup/modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 80%;
  color: black;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
