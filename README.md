# OneAuthClient API Documentation

## Overview

`OneAuthClient` is a JavaScript client for interacting with the OneAuth API, providing methods for obtaining authentication tokens, redirecting users for authorization, and logging out by invalidating refresh tokens. It uses Axios for HTTP requests.

## Class: `OneAuthClient`

### Constructor

```typescript
constructor(axiosInstance: AxiosInstance, baseUrl: string)
```

- **Parameters:**
  - `axiosInstance` (`AxiosInstance`): An Axios instance used for making HTTP requests.
  - `baseUrl` (`string`): The base URL for the OneAuth API.

### Methods

| Method                  | Description                                                    | Parameters                                                                                                            | Returns                                                   |
|-------------------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `getOneAuthToken`       | Requests an access token using the authorization code.         | `args` (object): <br> - `client_id` (`string`): Client identifier. <br> - `redirect_uri` (`string`): Redirect URI after authorization. <br> - `grant_type` (`'authorization_code'`): Grant type for token. <br> - `code` (`string`): Authorization code received. | `Promise<AxiosResponse<GetOneAuthTokenResponse>>` with the token data. |
| `redirectToOneAuth`     | Redirects the user to the OneAuth authentication page.         | None                                                                                                                  | `void`                                                     |
| `mutateOneAuthSignOut`  | Signs out the user by invalidating the provided refresh token. | `args` (object): <br> - `client_id` (`string`): Client identifier. <br> - `refresh_token` (`string`): The user's refresh token.                                 | `Promise<AxiosResponse<void>>` indicating sign-out success. |

### Example Usage

```typescript
import axios from 'axios';
import { OneAuthClient } from './OneAuthClient';

const axiosInstance = axios.create();
const baseUrl = 'https://auth.example.com';
const oneAuthClient = new OneAuthClient(axiosInstance, baseUrl);

// Obtain an access token
oneAuthClient.getOneAuthToken({
  client_id: 'your_client_id',
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
oneAuthClient.mutateOneAuthSignOut({
  client_id: 'your_client_id',
  refresh_token: 'user_refresh_token'
}).then(() => {
  console.log('User signed out successfully.');
}).catch(error => {
  console.error('Failed to sign out:', error);
});
```

### Notes

- Ensure the `baseUrl` parameter points to the correct SSO API base URL.
- When redirecting with `redirectToOneAuth`, the `client_id` and other parameters must be configured correctly to obtain the authorization code.