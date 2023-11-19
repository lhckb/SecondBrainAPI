export default class EmailAlreadyExistsException extends Error {
  constructor() {
    super("E-mail already in use.")
  }
}