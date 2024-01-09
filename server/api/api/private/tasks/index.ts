/* eslint-disable */
export type Methods = {
  post: {
    status: 201

    /** Task to be created */
    reqBody: {
      title: string
      description?: string | undefined
      dueDate?: string | undefined
      userId: string
    }
  }
}
