type PaginationResponse = {
  total: number
  page: number
  limit: number
  lastPage: number
}

export class ApiResponse {
  data: any
  pagination?: PaginationResponse
  message?: string = 'success'

  static create(data: any, pagination: PaginationResponse = null, message: string = null): ApiResponse {
    const apiResponse = new ApiResponse()
    apiResponse.data = data
    if (pagination) {
      apiResponse.pagination = pagination
    }
    if (message) {
      apiResponse.message = message
    }
    return apiResponse
  }
}
