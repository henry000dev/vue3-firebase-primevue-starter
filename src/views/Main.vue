<template>
  <Toast position="top-center" group="tc" />

  <h1>Main Content</h1>
  <p>Hello {{username}}</p>
  <div>
    <Button label="Log Out" icon="pi-sign-out" :loading="isProcessing" @click="logout" />
  </div>
</template>

<script>
import Button from "primevue/button";
import Toast from "primevue/toast";
import router from "../router";
import firebase from "../firebase/firebase";

export default {
  components: {
    Button,
    Toast,
  },

    data() {
      return {
        isProcessing: false,
      };
    },

  computed: {
    username() {
      return firebase.getUser().displayName;
    },
  },

  methods: {
    handleLogOutError() {
      // Just pretend to log out silently.
      router.push("/");

      // this.$toast.add({severity: "error", summary: "Error", detail: "Failed to log out!", group: "tc", life: 3000});
      // setTimeout(function() {
      //   router.push("/");
      // }, 3000);
    },

    async logout() {
      this.isProcessing = true;

      try {
        await firebase.logout();

        router.push("/");
      } catch(err) {
        this.handleLogOutError();
      } finally {
        this.isProcessing = false;
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>