<template>
  <Nav />
  <div class="about">
    <h1>This is the about page.</h1>
  </div>
</template>

<script>
  import Nav from "../components/Nav.vue";

  export default {
    name: "Home",
    components: {
      Nav,
    },
  };
</script>
