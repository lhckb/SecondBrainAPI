import SecondBrainApplicationError from "./SecondBrainApplicationError";

export default class IncorrectPasswordException extends SecondBrainApplicationError {
  constructor() {
    super("Password is incorrect.");
  }
}