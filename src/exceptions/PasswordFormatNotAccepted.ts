import SecondBrainApplicationError from './SecondBrainApplicationError';

export default class PasswordFormatNotAcceptedException extends SecondBrainApplicationError {
  constructor() {
    super(`Password must be at least 10 characters long and contain at least one uppercase letter, one lower case letter, a number and one special character.`);
  }
}