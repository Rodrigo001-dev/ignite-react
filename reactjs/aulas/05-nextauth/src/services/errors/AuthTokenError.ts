// quando eu crio uma classe de erro eu consigo diferenciar um erro do outro, eu
// consigo saber qual o erro que aconteceu
export class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token.');
  }
}