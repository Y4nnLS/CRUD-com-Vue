# Projeto de Gerenciamento de Filmes

Este projeto é uma aplicação web para gerenciamento de filmes. Ele permite adicionar, editar, listar e excluir filmes, além de exibir detalhes dos filmes cadastrados. O backend é implementado em Java usando o Quarkus e o frontend é desenvolvido em Vue.js.

## Estrutura do Projeto

### Projeto Proposto

#### Backend Imperativo

O backend foi implementado utilizando o padrão RESTful. Foi criada uma classe `MovieResource` que contem os métodos CRUD (Create, Read, Update, Delete). Cada método foi mapeado para um endpoint específico usando as anotações do JAX-RS:

- `@POST`: Endpoint para criar um novo filme.
- `@GET`: Endpoint para ler (recuperar) filmes.
- `@PUT`: Endpoint para atualizar um filme existente.
- `@DELETE`: Endpoint para deletar um filme.

#### Frontend

O frontend foi desenvolvido usando Vue.js e consiste em três componentes principais:

- **MovieList.vue**: Exibe uma lista de filmes e inclui funcionalidades de filtro por nome, paginação sob demanda e ordenação na coluna nome.
- **MovieForm.vue**: Fornece um formulário para adicionar ou editar um filme.
- **Movie.vue**: Exibe os detalhes de um filme em um painel.

### Como Executar o Projeto

### Backend
1. Clone o repositório.
2. Navegue até o diretório do projeto backend.
3. Execute o comando `./mvnw quarkus:dev` para iniciar o servidor Quarkus.

### Frontend
1. Navegue até o diretório do projeto frontend.
2. Execute o comando `npm install` para instalar as dependências.
3. Execute o comando `npm run serve` para iniciar o servidor de desenvolvimento.