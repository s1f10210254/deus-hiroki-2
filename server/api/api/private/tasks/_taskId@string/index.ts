/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Task retrieved successfully */
    resBody: Types.Task
  }

  put: {
    status: 200

    /** Task data to be updated */
    reqBody: {
      title?: string | undefined
      description?: string | undefined
      isComplete?: boolean | undefined
      dueDate?: string | undefined
    }
  }

  delete: {
    status: 200
  }
}
