class User {
    constructor({email, password, role}) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

class Employer {
    constructor(obj) {

    }
}

module.exports = {User, Employer};