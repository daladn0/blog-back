module.exports = class UserDTO {
    constructor(model) {
        this.id = model._id
        this.username = model.username
        this.email = model.email
        this.roles = model.roles
    }
}