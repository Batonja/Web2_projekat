export   class UserLogin {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

 export   class User {
    constructor(userId, role, displayName, token, username, image) {
        this.userId =userId;
        this.role = role; 
        this.displayName = displayName;
        this.token = token;
        this.username = username;
        this.image = image;
    }
}

 export  class UserRegistration {
    constructor(userName, email, passportID, phoneNumber, password, firstName, lastName, image) {
        this.userName = userName
        this.email = email
        this.passportID = passportID
        this.phoneNumber = phoneNumber
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.image = image
    }
}
 