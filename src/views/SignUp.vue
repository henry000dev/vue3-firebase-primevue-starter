<template>
  <div class="content">
    <div class="header">
      <h1>Sign up</h1>
    </div>

    <Card class="card mp-auth-fields-container">
      <template #content>
        <div class="card-content">
          <div class="p-form email-auth-container">
            <div class="email-fields">
              <div class="p-fluid">
                <div class="p-field">
                  <label for="username">User Name</label>
                  <InputText id="username" v-model.trim="username" type="text" class="p-inputtext-sm" minlength=3 maxlength=30 required />
                  <small v-if="usernameError" id="username-error" class="p-error p-d-block mp-fixed-error-message-width">{{usernameError}}</small>
                </div>
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
                <Message v-if="signUpError" id="error-message" severity="error" class="p-mt-5 p-text-wrap">{{signUpError}}</Message>
                <Button id="continue-button" label="Sign Up" :loading="isProcessing" class="p-button-secondary p-button-lg" @click="handleSubmit" />
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
              <span class="p-ml-2">Sign up with Apple</span>
            </Button>

            <Button type="button" class="p-button-outlined">
              <img alt="Google" src="../assets/images/google-auth-icon.svg" style="width: 1.5rem" />
              <span class="p-ml-2">Sign up with Google</span>
            </Button>

            <Button type="button" class="p-button-outlined">
              <img alt="Facebook" src="../assets/images/facebook-auth-icon.svg" style="width: 1.5rem" />
              <span class="p-ml-2">Sign up with Facebook</span>
            </Button>
          </div>
        </div>
      </template>
    </Card>

    <div class="legal">
      <span class="p-text-secondary">By creating an account, you agree to our
        <a href="./legal.html" target="_blank">Terms of Service.</a>
      </span>
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
        username: "",
        email: "",
        password: "",
        usernameError: "",
        emailError: "",
        passwordError: "",
        signUpError: "",
        isProcessing: false,
      };
    },

    methods: {
      validateInputs() {
        this.usernameError = utils.validateUsername(this.username);
        this.emailError = utils.validateEmail(this.email);
        this.passwordError = utils.validatePassword(this.password);        
      },

      handleSignUpError(err) {
        this.signUpError = err.message;
        this.isProcessing = false;
      },
      
      resetState() {
        this.usernameError = "";
        this.emailError = "";
        this.passwordError = "";
        this.signUpError = "";
        this.isProcessing = false;
      },

      async signup() {
        // Check all fields are valid.
        if (this.usernameError || this.emailError || this.passwordError)
          return;

        this.isProcessing = true;

        // Sign up with Firebase Auth.
        try {
          await firebase.signup(this.username, this.email, this.password);

          this.isProcessing = false;
        } catch(err) {
          this.handleSignUpError(err);
        }
      },

      /**
       * Not using standard form-submit as it was causing some strange issue 
       * with validation popup messages where it sometimes just don't show 
       * at all.
       */
      async handleSubmit() {
        this.resetState();
        this.validateInputs();
        this.signup();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/styles/_mixins.scss";

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

    .legal {
      @include mp-flex-center;

      margin-top: 1rem;
      padding-bottom: 2rem;

      span {
        color: $light-text-color;
        padding: 1rem 0;
      }

      a {
        font-weight: bold;

        &:hover, &:focus {
          text-decoration: underline;
        }

        &:visited {
          color: $light-text-color;
        }
      }
    }
  }
</style>