export default class EmailFormatNotAcceptedException extends Error {
  constructor() {
    super("E-mail format not accepted.")
  }
}