import SecondBrainApplicationError from "./SecondBrainApplicationError";

export default class UserNotFoundException extends SecondBrainApplicationError {
  constructor() {
    super("User does not exist.");
  }
}