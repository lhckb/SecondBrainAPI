import SecondBrainApplicationError from "./SecondBrainApplicationError";

export default class EmailFormatNotAcceptedException extends SecondBrainApplicationError {
  constructor() {
    super("E-mail format not accepted.");
  }
}