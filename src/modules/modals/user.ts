class UserModels {
	name: String;
	email: String;
	created_at: String;
	mobile: String;
	role: String;
	updated_at: String;
	alternate_no: string;
	constructor(response: any) {
		this.name = response.name;
		this.email = response.email;
		this.created_at = response.created_at;
		this.mobile = response.mobile;
		this.role = response.role;
		this.updated_at = response.updated_at;
		this.alternate_no = response.alternate_no;
	}
}

class UserUpdate {
	name: String;
	// email: String;
	// created_at: String;
	// mobile: String;
	// updated_at: String;
	constructor(response: any) {
		this.name = response.name;
		// this.email = response.email;
		// this.created_at = response.created_at;
		// this.mobile = response.mobile;
		// this.updated_at = response.updated_at;
	}
}

export { UserModels, UserUpdate };
