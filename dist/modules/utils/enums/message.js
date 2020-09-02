"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messages;
(function (Messages) {
    Messages["WELCOME"] = "Welcome to backend API";
    Messages["ALL_USER_LIST"] = "All user list";
    Messages["ALL_USER_DELETED"] = "All user deleted";
    Messages["CONNECTED_TO_DATABASE"] = "Connection to database established";
    Messages["DB_ERROR"] = "Database connection error";
    Messages["EMAIL_EXISTS"] = "Email already exists";
    Messages["EMAIL_NOT_FOUND"] = "Email not found";
    Messages["EMAIL_NOT_IN_DB"] = "Email is not in our database";
    Messages["FAILED_OTP_VERIFICATION"] = "Failed in OTP verification";
    Messages["FILE_UPLOADED"] = "File uploaded successfully";
    Messages["INVALID_FORMAT"] = "Invalid format";
    Messages["INVALID_INCIDENT_ID"] = "Invalid Incident ID";
    Messages["INVALID_NUMBER"] = "Invalid mobile number";
    Messages["INVALID_OTP"] = "OTP verification unsuccessful";
    Messages["INVALID_PASSWORD"] = "Invalid Password";
    Messages["INVALID_TOKEN"] = "Invalid token";
    Messages["INVALID_TOKEN_TYPE"] = "Invalid token type, It should be Bearer";
    Messages["LIST_EXTRACTED"] = "list has been extracted successfully";
    Messages["MOBILE_EXISTS"] = "Mobile already exists";
    Messages["MOBILE_NOT_IN_DB"] = "Mobile number is not in our database";
    Messages["NEW_USER_REG_FAIL"] = "Unable to create new user";
    Messages["NO_AUTHORIZATION_HEADER"] = "No authorization header in request";
    Messages["NO_FILE"] = "No file received";
    Messages["NO_QUERY_EXIST"] = "No query found in database";
    Messages["NO_REQUEST_BODY"] = "No Request body";
    Messages["NO_SAVED"] = "Sorry! we do not have any OTP information for such number";
    Messages["NO_USER_EXIST"] = "No user found in database";
    Messages["NOT_VALID_JSON"] = "Invalid request format";
    Messages["OTP_CREATION_FAILED"] = "otp creation failed";
    Messages["OTP_EXPIRED"] = "OTP expired";
    Messages["OTP_MATCHED"] = "OTP matched successfully";
    Messages["OTP_NOT_MATCHED"] = "OTP not matched";
    Messages["OTP_NOT_SENT"] = "Failed to send OTP";
    Messages["OTP_SENT_TO_EMAIL"] = "OTP sent to email";
    Messages["OTP_SENT_TO_MOBILE"] = "OTP sent to mobile";
    Messages["OTP_SESSION_EXPIRED"] = "OTP session expired";
    Messages["OTP_VERIFIED"] = "OTP successfully verified";
    Messages["PASS_CHANGED_SUCCESS"] = "Password changed successfully.";
    Messages["PASSWORD_CHANGED_SUCCESSFULLY"] = "Password changed successfully";
    Messages["PORT_LISTEN"] = "Example app listening on port";
    Messages["QUERY_FOUND"] = "Your Queries";
    Messages["QUERY_SUBMITTED"] = "Your query submitted Successfully";
    Messages["SAME_MOBILE_NUMBER"] = "Alternate number and the primary number cannot be same";
    Messages["SUCCESS_LOGIN"] = "Logged In successfully";
    Messages["TOKEN_API_VALIDATION"] = "Invalid data while log in";
    Messages["UNABLE_TO_CREATE_QUERY"] = "Unable to create Query";
    Messages["UNABLE_TO_DELETE_USER"] = "User does not exist.";
    Messages["UNABLE_TO_SEND_USER_DATA"] = "Unable to send user details";
    Messages["UNABLE_TO_USER_UPDATE"] = "Unable to update the user";
    Messages["UNAUTHORIZED_REQUEST"] = "Unauthorized request";
    Messages["USER_CREATED"] = "User Created successfully";
    Messages["USER_DATA"] = "User Data";
    Messages["USER_DELETED_SUCCESSFULLY"] = "User deleted successfully";
    Messages["USER_LOGGED_IN_VIA_FACEBOOK"] = "User successfully logged via facebook";
    Messages["USER_LOGGED_IN_VIA_GOOGLE"] = "User successfully logged in via google";
    Messages["USER_UPDATED_SUCCESSFULLY"] = "User details updated successfully";
    Messages["USER_VERIFIED"] = "User veriified successfully";
})(Messages || (Messages = {}));
exports.Messages = Messages;
var StatusMessages;
(function (StatusMessages) {
    StatusMessages["SUCCESS"] = "success";
    StatusMessages["ERROR"] = "error";
})(StatusMessages || (StatusMessages = {}));
exports.StatusMessages = StatusMessages;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
})(StatusCode || (StatusCode = {}));
exports.StatusCode = StatusCode;