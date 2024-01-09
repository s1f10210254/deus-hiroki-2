/* eslint-disable */
export type Methods = {
  post: {
    status: 201

    /** User to be created */
    reqBody: {
      email: string
      name?: string | undefined
    }
  }
}
