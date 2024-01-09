/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  get: {
    status: 200

    /** User retrieved successfully */
    resBody: {
      id?: string | undefined
      email?: string | undefined
      name?: string | undefined
      tasks?: Types.Task[] | undefined
    }
  }
}
