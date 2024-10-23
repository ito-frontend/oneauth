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

export class OneAuthClient {
  private axiosClient: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosClient = axiosInstance
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

  mutateOneAuthSignOut(refreshToken: string): Promise<AxiosResponse<void>> {
    const body = new URLSearchParams({
      client_id: 'qp',
      refresh_token: refreshToken,
    })
    return this.axiosClient.post(this.getOneAuthEndpoint('/logout'), body, {
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  }

  private getOneAuthEndpoint(path: string): string {
    const targetRealm = window.location.host.endsWith('onead.com.tw')
      ? 'onead'
      : 'ito-env'
    return `https://accounts.onead.com.tw/realms/${targetRealm}/protocol/openid-connect${path}`
  }
}
