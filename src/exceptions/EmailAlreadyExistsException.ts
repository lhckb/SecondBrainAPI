import SecondBrainApplicationError from "./SecondBrainApplicationError";

export default class EmailAlreadyExistsException extends SecondBrainApplicationError {
  constructor() {
    super("E-mail already in use.");
  }
}