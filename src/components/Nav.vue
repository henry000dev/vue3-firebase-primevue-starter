<template>
  <div id="nav">
    <div class="identify">
      <p>Vue3 Firebase PrimeVue Starter</p>
    </div>
    <div class="buttons">
      <router-link to="/"><span>Home</span></router-link>
      <router-link to="/about"><span>About</span></router-link>
      <router-link :to="{path: '/login', query: {redirect: ''}}"><Button class="p-button-outlined p-button-sm">Log In</Button></router-link>
      <router-link to="/signup"><Button class="p-button-secondary p-button-sm">Sign Up</Button></router-link>  </div>
    </div>
</template>

<script>
  import Button from "primevue/button";

  export default {
    name: "Nav",
    components: {
      Button
    }
  }
</script>


<style scoped lang="scss">
  @mixin button-margin {
    margin: 0 1rem;
  }

  #nav {
    padding: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .identify {
      align-items: center;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    border-bottom: 1px solid var(--primary-color);

    span {
      @include button-margin;
    }

    Button {
      @include button-margin;
    }
  }
</style>