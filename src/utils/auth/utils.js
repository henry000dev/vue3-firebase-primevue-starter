// The lengths are inclusive.
export const MINIMUM_PASSWORD_LENGTH = 6;
export const MINIMUM_USERNAME_LENGTH = 3;
export const MAXIMUM_USERNAME_LENGTH = 30;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  validatePassword(password) {
    if (!password) {
      return "Password cannot be blank.";
    } else if (password.length < MINIMUM_PASSWORD_LENGTH) {
      return `Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters long.`;
    }
  },

  validateEmail(email) {
    const invalidEmail = !(email && EMAIL_REGEX.test(email.toLowerCase()));
    return invalidEmail ? "Email is not valid." : "";
  },

  validateUsername(username) {
    if (!username) {
      return "User name cannot be blank.";
    } else if (username.length < MINIMUM_USERNAME_LENGTH || username.length > MAXIMUM_USERNAME_LENGTH) {
      return `User name must be between ${MINIMUM_USERNAME_LENGTH} and ${MAXIMUM_USERNAME_LENGTH} characters long.`;
    }
  },
}