<template>
  <div class="content">
    <div class="header">
      <h1>{{isRedirected ? "Please log in first" : "Log in"}}</h1>
    </div>

    <Card class="card mp-auth-fields-container">
      <template #content>
        <div class="card-content">
          <div class="p-form email-auth-container">
            <div class="email-fields">
              <div class="p-fluid">
                <div class="p-field">
                  <label for="email">Email</label>
                  <InputText id="email" v-model.trim="email" type="email" class="p-inputtext-sm" required />
                  <small v-if="emailError" id="email-error" class="p-error p-d-block mp-fixed-error-message-width">{{emailError}}</small>
                </div>
                <div class="p-field">
                  <label for="password">Password</label>
                  <Password id="password" v-model.trim="password" :feedback="false" toggleMask="true" required ></Password>
                  <small v-if="passwordError" id="password-error" class="p-error p-d-block mp-fixed-error-message-width">{{passwordError}}</small>
                </div>
                <Message v-if="logInError" severity="error" class="p-mt-5">{{logInError}}</Message>
                <Button id="continue-button" label="Continue" :loading="isProcessing" class="p-button-secondary p-button-lg" @click="handleSubmit" />
              </div>
            </div>
          </div>

          <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-content">OR</div>
            <div class="divider-line"></div>
          </div>

          <div class="third-party-auth-container">
            <Button type="button" class="p-button-outlined">
              <img alt="Apple" src="../assets/images/apple-auth-icon.svg" style="width: 1.75rem" />
              <span class="p-ml-2">Continue with Apple</span>
            </Button>

            <Button type="button" class="p-button-outlined">
              <img alt="Google" src="../assets/images/google-auth-icon.svg" style="width: 1.5rem" />
              <span class="p-ml-2">Continue with Google</span>
            </Button>

            <Button type="button" class="p-button-outlined">
              <img alt="Facebook" src="../assets/images/facebook-auth-icon.svg" style="width: 1.5rem" />
              <span class="p-ml-2">Continue with Facebook</span>
            </Button>
          </div>
        </div>
      </template>
    </Card>

    <div class="misc">
      <router-link to="/resetPassword"><span class="p-text-secondary">Forgot password?</span></router-link>
      <router-link to="/signup"><span class="p-text-secondary">Create account!</span> </router-link>
    </div>
  </div>
</template>

<script>
  import InputText from "primevue/inputtext";
  import Password from "primevue/password";
  import Card from "primevue/card";
  import Button from "primevue/button";
  import firebase from "../firebase/firebase";
  import Message from "primevue/message";
  import router from "../router";
  import utils from "../utils/auth/utils.js";
  import "../assets/styles/common.scss";
  
  export default {
    components: {
      InputText,
      Password,
      Card,
      Button,
      Message,
    },

    data() {
      return {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        logInError: "",
        isProcessing: false,
      };
    },

    computed: {
      /**
       * This page is opened from either the navbar or other places where user
       * needs to log in first. If it's from the navbar then there is no
       * redirect. If it's from other places, then there should be a redirect
       * page specified in the form of query parameter. In the example below
       * a user is trying to access the main page without having logged in
       * initially:
       *      https://.../login?redirect=/main
       */
      isRedirected() {
        return this.$route.query.redirect;
      }
    },

    methods: {
      validateInputs() {
        this.emailError = utils.validateEmail(this.email);
        this.passwordError = utils.validatePassword(this.password);
      },

      handleLogInError(err) {
        // Simplify the default Firebase error message.
        if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || 
            err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
          this.logInError = "Email or password is not valid.";
        } else {
          // THere could be other errors such as network failure.
          this.logInError = err.message;
        }

        this.isProcessing = false;
      },

      resetState() {
        this.emailError = "";
        this.passwordError = "";
        this.logInError = "";
        this.isProcessing = false;
      },

      goToMainPage() {
        router.push({name: "Main"});
      },

      async login() {
        // Check all fields are valid.
        if (this.emailError || this.passwordError)
          return;

        this.isProcessing = true;

        // Log in with Firebase Auth.
        try {
          await firebase.login(this.email, this.password);

          this.isProcessing = false;

          this.goToMainPage();
        } catch(err) {
          this.handleLogInError(err);
        }
      },

      /**
       * Not using standard form-submit as it was causing some strange issue
       * with validation popup messages where it sometimes just don't show 
       * at all.
       */
      handleSubmit() {
        this.resetState();
        this.validateInputs();
        this.login();
      }
    }
  };
</script>

<style scoped lang="scss">
  $light-text-color: var(--light-color-text);

  .content {
    height: 100vh;
    min-height: 100%;
    min-width: 100%;

    // This fixes  a weird horizontal overflow issue when browser size is 
    // smaller than card.
    overflow: auto;

    background-color: var(--primary-color);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

   .header {
      padding: 2rem;

      h1 {
        color: $light-text-color;
      }
    }

    .card {
      padding: 1rem;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .email-auth-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .email-fields {
        display: flex;
        flex-direction: column;

        #continue-button {
          margin: 1rem 0;
        }
      }
    }

    .divider {
      display: flex;
      flex-direction: row;
      align-items: center;

      margin: 2rem 0;

      .divider-line {
        flex: 1;

        height: 1px;
        background-color: var(--border-linde-color);
      }

      .divider-content {
        padding: 0 1rem;
      }
    }

    .third-party-auth-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      button {
        // Overrides the default PrimeVue colour.
        color: var(--dark-color-text);

        text-align: center;
        display: flex;
        justify-content: center;

        margin: 0.25rem 0;
      }
    }

    .misc {
      display: flex;
      flex-direction: column;
      align-items: center;

      margin-top: 1rem;
      padding-bottom: 2rem;

      a {
        color: $light-text-color;
        padding: 1rem 0;
      }
    }
  }
</style>