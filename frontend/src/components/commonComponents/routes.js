const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  loginPage: () => '/login',
  mainPage: () => '/',
  signUpPage: () => '/signup',
  errorPage: () => '*',
};
