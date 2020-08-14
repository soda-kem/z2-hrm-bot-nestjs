export class ErrorResponse {
  errors?: []
  message = 'Internal Server Error'

  static create(message: string, errors?: []): ErrorResponse {
    const errorResponse = new ErrorResponse()
    errorResponse.message = message
    if (errors) errorResponse.errors = errors
    return errorResponse
  }
}
