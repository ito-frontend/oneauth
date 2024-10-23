# OneAuthClient API Documentation

## Overview

`OneAuthClient` is a JavaScript client for interacting with the OneAuth API. It provides methods for obtaining access tokens, redirecting users for authentication, and signing out users by invalidating their refresh tokens. The class is configured with an Axios instance, a base URL for the API, and a client ID.

## Class: `OneAuthClient`

### Constructor

```typescript
constructor(config: OneAuthClientConfig)
```

- **Parameters:**
  - `config` (`OneAuthClientConfig`): Configuration object for the client.
    - `axiosInstance` (`AxiosInstance`): Axios instance for making HTTP requests.
    - `baseUrl` (`string`): The base URL for the OneAuth API.
    - `clientId` (`string`): Client identifier for authentication.

### Methods

| Method                  | Description                                                    | Parameters                                                                                                  | Returns                                                   |
|-------------------------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `getOneAuthToken`       | Requests an access token using the authorization code.         | `args` (object): <br> - `redirect_uri` (`string`): Redirect URI after authorization. <br> - `grant_type` (`'authorization_code'`): Must be `'authorization_code'`. <br> - `code` (`string`): Authorization code received. | `Promise<AxiosResponse<GetOneAuthTokenResponse>>` containing token data. |
| `redirectToOneAuth`     | Redirects the user to the OneAuth authentication page.         | None                                                                                                        | `void`                                                     |
| `mutateOneAuthSignOut`  | Signs out the user by invalidating the provided refresh token. | `refreshToken` (`string`): The refresh token to invalidate.                                                 | `Promise<AxiosResponse<void>>` indicating sign-out success. |

### Type Definitions

#### `GetOneAuthTokenArgs`

- `redirect_uri` (`string`): URI to redirect to after authorization.
- `grant_type` (`'authorization_code'`): Grant type for obtaining the token.
- `code` (`string`): Authorization code received after user login.

#### `GetOneAuthTokenResponse`

- `access_token` (`string`): The access token for accessing resources.
- `expires_in` (`number`): The lifetime of the access token in seconds.
- `refresh_expires_in` (`number`): The lifetime of the refresh token in seconds.
- `refresh_token` (`string`): The token used for refreshing the access token.
- `token_type` (`'Bearer'`): The type of token issued.
- `id_token` (`string`): The ID token representing the authenticated user.
- `'not-before-policy'` (`number`): Time before which the token is not valid.
- `session_state` (`string`): State of the user's session.
- `scope` (`string`): Scopes associated with the token.

#### `OneAuthClientConfig`

- `axiosInstance` (`AxiosInstance`): Axios instance used for HTTP requests.
- `baseUrl` (`string`): Base URL for the OneAuth API.
- `clientId` (`string`): Client identifier for authentication.

### Example Usage

```typescript
import axios from 'axios';
import { OneAuthClient } from './OneAuthClient';

const axiosInstance = axios.create();
const config = {
  axiosInstance,
  baseUrl: 'https://auth.example.com',
  clientId: 'your_client_id',
};
const oneAuthClient = new OneAuthClient(config);

// Obtain an access token
oneAuthClient.getOneAuthToken({
  redirect_uri: 'https://your.redirect.uri',
  grant_type: 'authorization_code',
  code: 'received_authorization_code'
}).then(response => {
  console.log('Access Token:', response.data.access_token);
}).catch(error => {
  console.error('Failed to get access token:', error);
});

// Redirect for user authentication
oneAuthClient.redirectToOneAuth();

// Sign out the user
oneAuthClient.mutateOneAuthSignOut('user_refresh_token')
  .then(() => {
    console.log('User signed out successfully.');
  })
  .catch(error => {
    console.error('Failed to sign out:', error);
  });
```

### Notes

- Ensure the `baseUrl` parameter points to the correct OneAuth API base URL.
- When redirecting with `redirectToOneAuth`, the `clientId` and other parameters must be configured correctly to obtain the authorization code.
- Use secure storage mechanisms for handling sensitive data such as access tokens and refresh tokens.