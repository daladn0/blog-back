module.exports = class UserDTO {
    constructor(model) {
        this.username = model.username
        this.email = model.email
        this.roles = model.roles
    }
}