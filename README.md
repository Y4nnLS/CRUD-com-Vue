# Projeto de Gerenciamento de Filmes

Este projeto é uma aplicação web para gerenciamento de filmes. Ele permite adicionar, editar, listar e excluir filmes, além de exibir detalhes dos filmes cadastrados. O backend é implementado em Java usando o Quarkus e o frontend é desenvolvido em Vue.js.

## Estrutura do Projeto

### Frontend

#### api.js
Este arquivo é responsável por fazer as requisições HTTP para a API do backend. Ele usa a biblioteca Axios para criar uma instância da API com a URL base e os cabeçalhos padrão.

- createMovie(movie): Envia uma requisição POST para adicionar um novo filme.
- updateMovie(id, movie): Envia uma requisição PUT para atualizar um filme existente pelo ID.
- getMovie(id): Envia uma requisição GET para recuperar um filme pelo ID.
- getAllMovies(): Envia uma requisição GET para recuperar todos os filmes.
- deleteMovie(id): Envia uma requisição DELETE para remover um filme pelo ID.

#### MovieForm.vue
Componente Vue que fornece um formulário para adicionar ou editar um filme. Ele lida com o envio do formulário e se comunica com a API para salvar os dados do filme.
- salvarFilme(): Método para salvar um filme, seja criando um novo ou atualizando um existente.
- carregarFilme(id): Método para carregar os dados de um filme ao editar.

#### MovieList.vue
Componente Vue que exibe uma lista de filmes com funcionalidades de busca, ordenação, paginação e ações como editar, excluir e visualizar detalhes dos filmes.
- fetchMovies(): Método para buscar a lista de filmes da API.
- sortBy(key): Método para ordenar filmes por uma chave especificada.
- editMovie(id): Navega para o formulário de edição de filme.
- deleteMovie(id, title): Exclui um filme e atualiza a lista.
- showMovieInfo(movie): Exibe informações detalhadas sobre um filme.

### Backend
O backend é implementado em Java usando o Quarkus. Ele inclui várias classes para manipular os dados dos filmes.

#### MovieResource.java
Classe que define os endpoints da API REST para operações CRUD em filmes.

- `getAll()`: Retorna uma lista de todos os filmes.
- `create(Movie)`: Adiciona um novo filme.
- `getById(Long id)`: Recupera um filme pelo ID.
- `update(Long id, Movie)`: Atualiza um filme existente pelo ID.
- `delete(Long id)`: Exclui um filme pelo ID.

#### MovieService.java
Classe que contém a lógica de negócios para manipulação dos filmes, como adicionar, atualizar, excluir e listar filmes.

#### Movie.java
Classe que representa a entidade Filme, mapeada para a tabela "movies" no banco de dados.
- releaseYear: Ano de lançamento do filme.
- title: Título do filme.
- studios: Estúdios responsáveis pelo filme.
- producers: Produtores do filme.
- winner: Indica se o filme foi vencedor de algum prêmio.

## Como Executar o Projeto

### Backend
1. Clone o repositório.
2. Navegue até o diretório do projeto backend.
3. Execute o comando `./mvnw quarkus:dev` para iniciar o servidor Quarkus.

### Frontend
1. Navegue até o diretório do projeto frontend.
2. Execute o comando `npm install` para instalar as dependências.
3. Execute o comando `npm run serve` para iniciar o servidor de desenvolvimento.

