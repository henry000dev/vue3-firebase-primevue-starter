<template>
  <div class="home">
    <Nav />
    <HomeContent />
  </div>
</template>

<script>
  import HomeContent from "@/components/HomeContent.vue";
  import Nav from "../components/Nav.vue";

  export default {
    name: "Home",
    components: {
      HomeContent,
      Nav,
    },
  };
</script>

<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
</style>