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
          <th @click="sortBy('year')">Ano</th>
          <th @click="sortBy('title')">Título</th>
          <th>Prêmio</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in filteredAndPaginatedMovies" :key="index" :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
          <td>{{ movie.ano }}</td>
          <td>{{ movie.título }}</td>
          <td>{{ movie.vencedor ? "Sim" : "Não" }}</td>
          <td>
            <button @click="editMovie(movie.título)">Edit</button>
            <button @click="deleteMovie(movie.título)">Delete</button>
            <button @click="showMovieInfo(movie)">info</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      Nenhum filme encontrado.
    </div>
    <!-- Popup para exibir informações do filme -->
    <div class="modal" v-if="selectedMovie">
      <div class="modal-content">
        <span class="close" @click="closePopup">&times;</span>
        <!-- Passando o filme selecionado como propriedade para o componente Movie -->
        <Movie :movie="selectedMovie" />
      </div>
    </div>

    <!-- Paginação -->
    <pagination :total="filteredMovies.length" :page="page" @page-changed="handlePageChange" :per-page="perPage" />
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
      movies: [],
      searchQuery: "",
      sortKey: "year",
      sortAsc: true,
      page: 1,
      total: 0,
      perPage: 10,
      selectedMovie: null
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.título.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredAndPaginatedMovies() {
      const startIndex = (this.page - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredMovies.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchMovies() {
      const params = {
        q: this.searchQuery,
        sort: this.sortKey,
        order: this.sortAsc ? "asc" : "desc",
        page: this.page,
        per_page: this.perPage
      };

      console.log('Fetching movies with params:', params);

      api
        .getMovies(params)
        .then((response) => {
          console.log('Response from API:', response);

          const filmesString = response.data.substring(1, response.data.length - 1).split("], ");

          this.movies = filmesString.map((filmeString) => {
            filmeString = filmeString.replace(/(\[|\])/g, "");
            const partesFilme = filmeString.split(", ");
            const ano = partesFilme
              .find((parte) => parte.includes("year="))
              .split("=")[1];
            const título = partesFilme
              .find((parte) => parte.includes("title="))
              .split("=")[1];
            const vencedor =
              partesFilme
                .find((parte) => parte.includes("winner="))
                .split("=")[1] === "true";
            return {
              ano,
              título,
              vencedor,
            };
          });

          console.log('Response headers:', response.headers);

          // Temporariamente calculando o total localmente se o cabeçalho não estiver presente
          if (response.headers['x-total-count']) {
            this.total = parseInt(response.headers['x-total-count'], 10);
          } else {
            console.error('x-total-count header is missing');
            this.total = this.movies.length; // Usando o comprimento dos filmes retornados como fallback temporário
          }

          console.log('Total movies count:', this.total);
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
      this.$router.push({ name: "EditMovie", params: { id } });
    },
    deleteMovie(id) {
      api.deleteMovie(id).then(() => {
        this.fetchMovies();
      });
    },
    showMovieInfo(movie) {
      console.log("Entrou1")
      this.selectedMovie = movie;
      // console.log('Informações do filme:', movie);

    },
    closePopup() {
      console.log("entrou2 close")
      this.selectedMovie = null;
    },
    handlePageChange(page) {
      console.log('Page changed to:', page);
      this.page = page;
      this.fetchMovies();
    }
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
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
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
