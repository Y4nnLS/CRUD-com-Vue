<template>
  <div>
    <h1>Visão Geral do Projeto</h1>
    <section>
      <h2>api.js</h2>
      <p>
        Este arquivo é responsável por fazer as requisições HTTP para a API do backend. Ele usa a biblioteca Axios para criar uma instância da API com a URL base e os cabeçalhos padrão.
      </p>
      <ul>
        <li><strong>createMovie(movie):</strong> Envia uma requisição POST para adicionar um novo filme.</li>
        <li><strong>updateMovie(id, movie):</strong> Envia uma requisição PUT para atualizar um filme existente pelo ID.</li>
        <li><strong>getMovie(id):</strong> Envia uma requisição GET para recuperar um filme pelo ID.</li>
        <li><strong>getAllMovies():</strong> Envia uma requisição GET para recuperar todos os filmes.</li>
        <li><strong>deleteMovie(id):</strong> Envia uma requisição DELETE para remover um filme pelo ID.</li>
      </ul>
    </section>

    <section>
      <h2>MovieForm.vue</h2>
      <p>
        Este componente fornece um formulário para adicionar ou editar um filme. Ele lida com o envio do formulário e se comunica com a API para salvar os dados do filme.
      </p>
      <ul>
        <li><strong>salvarFilme():</strong> Método para salvar um filme, seja criando um novo ou atualizando um existente.</li>
        <li><strong>carregarFilme(id):</strong> Método para carregar os dados de um filme ao editar.</li>
      </ul>
    </section>

    <section>
      <h2>MovieList.vue</h2>
      <p>
        Este componente exibe uma lista de filmes com opções para buscar, ordenar, paginar e realizar ações como editar, excluir ou visualizar detalhes de um filme.
      </p>
      <ul>
        <li><strong>fetchMovies():</strong> Método para buscar a lista de filmes da API.</li>
        <li><strong>sortBy(key):</strong> Método para ordenar filmes por uma chave especificada.</li>
        <li><strong>editMovie(id):</strong> Navega para o formulário de edição de filme.</li>
        <li><strong>deleteMovie(id, title):</strong> Exclui um filme e atualiza a lista.</li>
        <li><strong>showMovieInfo(movie):</strong> Exibe informações detalhadas sobre um filme.</li>
      </ul>
    </section>

    <section>
      <h2>Backend (Java)</h2>
      <p>
        O backend é implementado em Java usando o Quarkus. Ele inclui várias classes para manipular os dados dos filmes.
      </p>
      <h3>MovieResource.java</h3>
      <p>
        Esta classe define os endpoints da API REST para operações CRUD em filmes.
      </p>
      <ul>
        <li><strong>getAll():</strong> Retorna uma lista de todos os filmes.</li>
        <li><strong>create(Movie):</strong> Adiciona um novo filme.</li>
        <li><strong>getById(Long id):</strong> Recupera um filme pelo ID.</li>
        <li><strong>update(Long id, Movie):</strong> Atualiza um filme existente pelo ID.</li>
        <li><strong>delete(Long id):</strong> Exclui um filme pelo ID.</li>
      </ul>
    </section>

    <section>
      <h3>MovieService.java</h3>
      <p>
        Esta classe contém a lógica de negócios para manipulação dos filmes, como adicionar, atualizar, excluir e listar filmes.
      </p>
    </section>

    <section>
      <h3>Movie.java</h3>
      <p>
        Esta classe representa a entidade Filme, mapeada para a tabela "movies" no banco de dados.
      </p>
      <ul>
        <li><strong>releaseYear:</strong> Ano de lançamento do filme.</li>
        <li><strong>title:</strong> Título do filme.</li>
        <li><strong>studios:</strong> Estúdios responsáveis pelo filme.</li>
        <li><strong>producers:</strong> Produtores do filme.</li>
        <li><strong>winner:</strong> Indica se o filme foi vencedor de algum prêmio.</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProjectOverview",
};
</script>
