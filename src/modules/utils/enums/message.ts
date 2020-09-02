enum Messages {
  WELCOME = 'Welcome to backend API',
  ALL_USER_LIST = 'All user list',
  ALL_USER_DELETED = 'All user deleted',
  CONNECTED_TO_DATABASE = 'Connection to database established',
  DB_ERROR = 'Database connection error',
  EMAIL_EXISTS = 'Email already exists',
  EMAIL_NOT_FOUND = 'Email not found',
  EMAIL_NOT_IN_DB = 'Email is not in our database',
  FAILED_OTP_VERIFICATION = 'Failed in OTP verification',
  FILE_UPLOADED = 'File uploaded successfully',
  INVALID_FORMAT = 'Invalid format',
  INVALID_INCIDENT_ID = 'Invalid Incident ID',
  INVALID_NUMBER = 'Invalid mobile number',
  INVALID_OTP = 'OTP verification unsuccessful',
  INVALID_PASSWORD = 'Invalid Password',
  INVALID_TOKEN = 'Invalid token',
  INVALID_TOKEN_TYPE = 'Invalid token type, It should be Bearer',
  LIST_EXTRACTED = 'list has been extracted successfully',
  MOBILE_EXISTS = 'Mobile already exists',
  MOBILE_NOT_IN_DB = 'Mobile number is not in our database',
  NEW_USER_REG_FAIL = 'Unable to create new user',
  NO_AUTHORIZATION_HEADER = 'No authorization header in request',
  NO_FILE = 'No file received',
  NO_QUERY_EXIST = 'No query found in database',
  NO_REQUEST_BODY = 'No Request body',
  NO_SAVED = 'Sorry! we do not have any OTP information for such number',
  NO_USER_EXIST = 'No user found in database',
  NOT_VALID_JSON = 'Invalid request format',
  OTP_CREATION_FAILED = 'otp creation failed',
  OTP_EXPIRED = 'OTP expired',
  OTP_MATCHED = 'OTP matched successfully',
  OTP_NOT_MATCHED = 'OTP not matched',
  OTP_NOT_SENT = 'Failed to send OTP',
  OTP_SENT_TO_EMAIL = 'OTP sent to email',
  OTP_SENT_TO_MOBILE = 'OTP sent to mobile',
  OTP_SESSION_EXPIRED = 'OTP session expired',
  OTP_VERIFIED = 'OTP successfully verified',
  PASS_CHANGED_SUCCESS = 'Password changed successfully.',
  PASSWORD_CHANGED_SUCCESSFULLY = 'Password changed successfully',
  PORT_LISTEN = 'Example app listening on port',
  QUERY_FOUND = 'Your Queries',
  QUERY_SUBMITTED = 'Your query submitted Successfully',
  SAME_MOBILE_NUMBER = 'Alternate number and the primary number cannot be same',
  SUCCESS_LOGIN = 'Logged In successfully',
  TOKEN_API_VALIDATION = 'Invalid data while log in',
  UNABLE_TO_CREATE_QUERY = 'Unable to create Query',
  UNABLE_TO_DELETE_USER = 'User does not exist.',
  UNABLE_TO_SEND_USER_DATA = 'Unable to send user details',
  UNABLE_TO_USER_UPDATE = 'Unable to update the user',
  UNAUTHORIZED_REQUEST = 'Unauthorized request',
  USER_CREATED = 'User Created successfully',
  USER_DATA = 'User Data',
  USER_DELETED_SUCCESSFULLY = 'User deleted successfully',
  USER_LOGGED_IN_VIA_FACEBOOK = 'User successfully logged via facebook',
  USER_LOGGED_IN_VIA_GOOGLE = 'User successfully logged in via google',
  USER_UPDATED_SUCCESSFULLY = 'User details updated successfully',
  USER_VERIFIED = 'User veriified successfully',
}

enum StatusMessages {
  SUCCESS = 'success',
  ERROR = 'error',
}

enum StatusCode {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SUCCESS = 200,
}

export { Messages, StatusCode, StatusMessages };
