# OneAuthClient API Documentation

## Overview

`OneAuthClient` facilitates user authentication with the OneAuth API. It supports obtaining access tokens, redirecting for authentication, and signing out users with refresh tokens.

## Class: `OneAuthClient`

### Constructor

```typescript
constructor(axiosInstance: AxiosInstance)
```

- **Parameters:**
  - `axiosInstance`: An Axios instance for making HTTP requests.

### Methods

| Method                        | Description                                                | Parameters                                                                                                            | Returns                                              |
|-------------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| `getOneAuthToken`            | Requests an access token using an authorization code.      | `args`: <br>- `client_id` (string): Client identifier. <br>- `redirect_uri` (string): Redirect URI after authorization. <br>- `grant_type` (string): Must be `'authorization_code'`. <br>- `code` (string): Authorization code received. | Promise resolving to an Axios response with token data. |
| `redirectToOneAuth`          | Redirects to the OneAuth authentication page.              | None                                                                                                                  | `void`                                               |
| `mutateOneAuthSignOut`       | Signs out the user by invalidating the refresh token.      | `refreshToken` (string): User's refresh token.                                                                      | Promise resolving to an Axios response confirming sign-out. |

### Example Usage

```typescript
import axios from 'axios';
import { OneAuthClient } from './OneAuthClient';

const axiosInstance = axios.create();
const oneAuthClient = new OneAuthClient(axiosInstance);

// Get access token
oneAuthClient.getOneAuthToken({
  client_id: 'your_client_id',
  redirect_uri: 'https://your.redirect.uri',
  grant_type: 'authorization_code',
  code: 'received_authorization_code'
}).then(response => {
  console.log(response.data);
});

// Redirect for authentication
oneAuthClient.redirectToOneAuth();

// Sign out user
oneAuthClient.mutateOneAuthSignOut('user_refresh_token').then(() => {
  console.log('Signed out successfully');
});
```

### Error Handling

Handle errors appropriately, as each method returns a Promise that may be rejected due to network issues or invalid responses.