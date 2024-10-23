import type { AxiosInstance, AxiosResponse } from 'axios'

type GetOneAuthTokenArgs = {
  redirect_uri: string
  grant_type: 'authorization_code'
  code: string
}

type GetOneAuthTokenResponse = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: 'Bearer'
  id_token: string
  'not-before-policy': number
  session_state: string
  scope: string
}

type OneAuthClientConfig = {
  axiosInstance: AxiosInstance
  baseUrl: string
  clientId: string
}

export class OneAuthClient {
  private axiosClient: AxiosInstance
  private baseUrl: string
  private clientId: string

  constructor(config: OneAuthClientConfig) {
    this.baseUrl = config.baseUrl
    this.axiosClient = config.axiosInstance
    this.clientId = config.clientId
  }

  getOneAuthToken(
    args: GetOneAuthTokenArgs,
  ): Promise<AxiosResponse<GetOneAuthTokenResponse>> {
    const { redirect_uri, code } = args
    const body = new URLSearchParams({
      redirect_uri,
      code,
      client_id: this.clientId,
      grant_type: 'authorization_code',
    })
    return this.axiosClient.post(this.getOneAuthEndpoint('/token'), body, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  }

  redirectToOneAuth(): void {
    const oneAuthUri = new URL(this.getOneAuthEndpoint('/auth'))
    const oneAuthXSearchParams = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: window.location.href,
      response_type: 'code',
      scope: 'openid',
    })
    oneAuthUri.search = oneAuthXSearchParams.toString()
    window.location.href = oneAuthUri.href
  }

  mutateOneAuthSignOut(refreshToken: string): Promise<AxiosResponse<void>> {
    const body = {
      clientId: this.clientId,
      refresh_token: refreshToken,
    }
    return this.axiosClient.post(this.getOneAuthEndpoint('/logout'), body, {
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  }

  private getOneAuthEndpoint(path: string): string {
    return `${this.baseUrl}${path}`
  }
}
