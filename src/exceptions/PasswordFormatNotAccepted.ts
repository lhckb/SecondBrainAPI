export default class PasswordFormatNotAcceptedException extends Error {
  constructor() {
    super(`Password must be at least 10 characters long and contain at least one uppercase letter, one lower case letter, a number and one special character.`)
  }
}