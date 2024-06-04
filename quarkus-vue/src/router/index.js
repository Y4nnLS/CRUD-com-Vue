import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieListView from '../views/MovieListView.vue';
import MovieFormView from '../views/MovieFormView.vue';
import MovieDetailView from '../views/MovieDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MovieListView
    },
    {
      path: '/movies/add',
      name: 'addMovie',
      component: MovieFormView
    },
    {
      path: '/movies/:id/edit',
      name: 'editMovie',
      component: MovieFormView
    },
    {
      path: '/movies/:id',
      name: 'viewMovie',
      component: MovieDetailView
    }
  ]
});

export default router;
