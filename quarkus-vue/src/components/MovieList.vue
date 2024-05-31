<template>
  <div>
    <input
      v-model="searchQuery"
      @input="fetchMovies"
      placeholder="Search by title"
    />

    <table>
      <thead>
        <tr>
          <th @click="sortBy('year')">Ano</th>
          <th @click="sortBy('title')">Título</th>
          <th>Prêmio</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, index) in paginatedMovies" :key="index" :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
          <td>{{ movie.ano }}</td>
          <td>{{ movie.título }}</td>
          <td>{{ movie.vencedor ? "Sim" : "Não" }}</td>
          <td>
            <button @click="editMovie(movie.title)">Edit</button>
            <button @click="deleteMovie(movie.title)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :total="total" :page="page" @page-changed="handlePageChange" :per-page="10" />
  </div>
</template>

<script>
import api from "../services/api";
import Pagination from "./Pagination.vue";

export default {
  components: { Pagination },
  data() {
    return {
      movies: [],
      searchQuery: "",
      sortKey: "year", // Sort by year by default
      sortAsc: true,
      page: 1,
      total: 0,
      perPage: 10 // Number of movies per page
    };
  },
  computed: {
    paginatedMovies() {
      const startIndex = (this.page - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.movies.slice(startIndex, endIndex);
    }
  },
  methods: {
    fetchMovies() {
      const params = {
        q: this.searchQuery,
        sort: this.sortKey,
        order: this.sortAsc ? "asc" : "desc",
        per_page: this.perPage // Passa o número de filmes por página para a API
      };

      api
        .getMovies(params)
        .then((response) => {
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

          this.total = parseInt(response.headers["x-total-count"]); // Atualiza o total com base no número total de filmes
        })
        .catch((error) => {
          console.error("Erro ao buscar filmes:", error);
        });
    },

    sortBy(key) {
      this.sortKey = key;
      this.sortAsc = !this.sortAsc;
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
    handlePageChange(page) {
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
/*Estilos para linhas alternadas */
.even-row {
  background-color: #696969;
}
.odd-row {
  background-color: #434343;
}
</style>
