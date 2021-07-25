<template>
  <div class="content">
    <div class="header">
      <h1>Reset your password</h1>
    </div>

    <Card class="card mp-auth-fields-container">
      <template #content>
        <div class="card-content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptate iusto, reiciendis consequuntur praesentium architecto nemo est ipsam incidunt explicabo cum delectus cupiditate labore temporibus iste dolor sequi? Culpa, dignissimos?</p>
          <div class="p-form email-auth-container">
            <div class="email-fields">
              <div class="p-fluid">
                <div class="p-field">
                  <label for="email">Email</label>
                  <InputText id="email" v-model.trim="email" type="email" class="p-inputtext-sm" required />
                  <small v-if="emailError" id="email-error" class="p-error p-d-block mp-fixed-error-message-width">{{emailError}}</small>
                </div>
                <Message id="error-message" v-if="resetPasswordError" severity="error" class="p-mt-5">{{resetPasswordError}}</Message>
                <Message id="email-sent-message" v-if="emailSent" severity="success" :closable="false" class="p-mt-5">
                  <div>
                    <p>Password reset instruction has been sent to your email.</p>
                    <br>
                    <p>Please check yoiur email and follow the instruction.</p>
                  </div>
                </Message>
                <Button id="continue-button" label="Reset Password" :loading="isProcessing" class="p-button-secondary p-button-lg" @click="handleSubmit" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
  import InputText from "primevue/inputtext";
  import Card from "primevue/card";
  import Button from "primevue/button";
  import firebase from "../firebase/firebase";
  import Message from "primevue/message";
  import utils from "../utils/auth/utils.js";
  import "../assets/styles/common.scss";

  export default {
    components: {
      InputText,
      Card,
      Button,
      Message,
    },

    data() {
      return {
        email: "",
        emailError: "",
        resetPasswordError: "",
        emailSent: false,
        isProcessing: false,
      };
    },

    methods: {
      validateInputs() {
        this.emailError = utils.validateEmail(this.email);
      },

      handleResetError(err) {
        this.resetPasswordError = err.message;
        this.isProcessing = false;
      },

      resetState() {
        this.emailError = "";
        this.resetPasswordError = "",
        this.emailSent = false;
        this.isProcessing = false;
      },

      async resetPassword() {
        // Check all fields are valid.
        if (this.emailError)
          return;


        this.isProcessing = true;

        // Reset password with Firebase Auth.
        try {
          await firebase.resetPassword(this.email);

          this.emailSent = true;

          this.isProcessing = false;
        } catch(err) {
          this.handleResetError(err);
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
        this.resetPassword();
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
  }
</style>