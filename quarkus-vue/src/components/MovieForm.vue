<template>
  <div>
    <h2>{{ movie.id ? 'Editar Filme' : 'Adicionar Filme' }}</h2>
    <form @submit.prevent="salvarFilme">
      <div>
        <label>Título</label>
        <input v-model="movie.title" required />
      </div>
      <div>
        <label>Ano de Lançamento</label>
        <input v-model="movie.releaseYear" type="number" required />
      </div>
      <div>
        <label>Estúdios</label>
        <input v-model="movie.studios" required />
      </div>
      <div>
        <label>Produtores</label>
        <input v-model="movie.producers" required />
      </div>
      <div>
        <label>Vencedor</label>
        <input type="checkbox" v-model="movie.winner" />
      </div>
      <button type="submit">Salvar</button>
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
    salvarFilme() {
      if (this.movie.id) {
        api.updateMovie(this.movie.id, this.movie).then(() => {
          this.$router.push({ name: 'ListaFilmes' });
        });
      } else {
        api.createMovie(this.movie).then(() => {
          this.$router.push({ name: 'ListaFilmes' });
        });
      }
    },
    carregarFilme(id) {
      api.getFilme(id).then(response => {
        this.movie = response.data;
      });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.carregarFilme(this.$route.params.id);
    }
  },
};
</script>
