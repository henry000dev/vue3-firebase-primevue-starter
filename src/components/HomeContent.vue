<template>
  <main id="home-content">
    <header id="header">
      <h1>
        Vue 3 & Firebase & PrimeVue Starter.
      </h1>
    </header>
    <section id="section-1">
      <div class="left">
        <img src="../assets/images/image-holder.png" alt="">
      </div>
      <div class="right">
        <div>
          <h3>Vue 3</h3>
          <p>Description here.</p>
        </div>
      </div>
    </section>
    <section id="section-2">
      <div class="left">
        <div>
          <h3>Firebase</h3>
          <p>Description here.</p>
        </div>
      </div>
      <div class="right">
        <img src="../assets/images/image-holder.png" alt="">
      </div>

    </section>
    <section id="section-3">
      <div class="left">
        <img src="../assets/images/image-holder.png" alt="">
      </div>
      <div class="right">
        <div>
          <h3>PrimeVue</h3>
          <p>Description here.</p>
        </div>
      </div>
    </section>
    <section id="section-4">
      <div class="left">
        <div>
          <h3>Starter Template</h3>
          <p>Description here.</p>
        </div>
      </div>
      <div class="right">
        <img src="../assets/images/image-holder.png" alt="">
      </div>

    </section>
    <section id="footer">
      <p>Footer here.</p>
    </section>
  </main>
</template>

<script>
  import "primeflex/primeflex.css";

  export default {
    name: "HelloComponent",

    props: {
      msg: String,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/styles/_mixins.scss";

  #home-content {
    padding: 2rem 0;

    section {
      padding: 2rem;
    }
  }

  #header {
    height: 50vh;

    @include mp-flex-center;
  }

  #section-1 {
    height: 30rem;
    background-color: var(--light-background-color);

    display: flex;
    flex-direction: row;

    .left {
      flex: 0.5;
      
      @include mp-flex-center;
    }

    .right {
      flex: 0.5;

      @include mp-flex-center;
    }
  }

  #section-2 {
    height: 30rem;

    display: flex;
    flex-direction: row;

    .left {
      flex: 0.5;

      @include mp-flex-center;
    }

    .right {
      flex: 0.5;
      
      @include mp-flex-center;
    }
  }

  #section-3 {
    height: 30rem;
    background-color: var(--light-background-color);

    display: flex;
    flex-direction: row;

    .left {
      flex: 0.5;
      
      @include mp-flex-center;
    }

    .right {
      flex: 0.5;

      @include mp-flex-center;
    }
  }

  #section-4 {
    height: 30rem;

    display: flex;
    flex-direction: row;

    .left {
      flex: 0.5;

      @include mp-flex-center;
    }

    .right {
      flex: 0.5;
      
      @include mp-flex-center;
    }
  }

  #footer {
    height: 40rem;
    background-color: black;

    p {
      color: var(--light-color-text);
    }
  }
</style>
