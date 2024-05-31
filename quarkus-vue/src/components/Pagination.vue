<template>
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage" :disabled="page >= pageCount">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      total: {
        type: Number,
        required: true,
      },
      page: {
        type: Number,
        required: true,
      },
    },
    computed: {
      pageCount() {
        return Math.ceil(this.total / 10); // Assuming 10 items per page
      },
    },
    methods: {
      nextPage() {
        this.$emit('page-changed', this.page + 1);
      },
      prevPage() {
        this.$emit('page-changed', this.page - 1);
      },
    },
  };
  </script>
  