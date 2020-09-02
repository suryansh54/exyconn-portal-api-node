"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModels = /** @class */ (function () {
    function UserModels(response) {
        this.name = response.name;
        this.email = response.email;
        this.created_at = response.created_at;
        this.mobile = response.mobile;
        this.role = response.role;
        this.updated_at = response.updated_at;
        this.alternate_no = response.alternate_no;
    }
    return UserModels;
}());
exports.UserModels = UserModels;
var UserUpdate = /** @class */ (function () {
    // email: String;
    // created_at: String;
    // mobile: String;
    // updated_at: String;
    function UserUpdate(response) {
        this.name = response.name;
        // this.email = response.email;
        // this.created_at = response.created_at;
        // this.mobile = response.mobile;
        // this.updated_at = response.updated_at;
    }
    return UserUpdate;
}());
exports.UserUpdate = UserUpdate;
