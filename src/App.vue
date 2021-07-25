<template>
  <router-view />
</template>

<style lang="scss">
  /** Global imports of PrimeVue utilities. */
  @import "~primevue/resources/primevue.min.css";
  @import "~primeicons/primeicons.css";

  /** Theme of the app. */
  // @import "~primevue/resources/themes/md-light-deeppurple/theme.css";
  @import "./assets/styles/_theme.scss";

  // html {
  //   font-size: 16px;
  // }

  // Vue app settings.
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
