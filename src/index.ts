import type { AxiosInstance, AxiosResponse } from 'axios'

type GetOneAuthTokenArgs = {
  client_id: string
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

type MutateOneAuthSignOutArgs = {
  client_id: string
  refresh_token: string
}

export class OneAuthClient {
  private axiosClient: AxiosInstance
  private baseUrl: string

  constructor(axiosInstance: AxiosInstance, baseUrl: string) {
    this.axiosClient = axiosInstance
    this.baseUrl = baseUrl
  }

  getOneAuthToken(
    args: GetOneAuthTokenArgs,
  ): Promise<AxiosResponse<GetOneAuthTokenResponse>> {
    const { client_id, redirect_uri, code } = args
    const body = new URLSearchParams({
      client_id,
      redirect_uri,
      grant_type: 'authorization_code',
      code,
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
      client_id: 'qp',
      redirect_uri: window.location.href,
      response_type: 'code',
      scope: 'openid',
    })
    oneAuthUri.search = oneAuthXSearchParams.toString()
    window.location.href = oneAuthUri.href
  }

  mutateOneAuthSignOut(
    args: MutateOneAuthSignOutArgs,
  ): Promise<AxiosResponse<void>> {
    const body = new URLSearchParams(args)
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
