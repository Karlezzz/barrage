const { nanoid } = require("nanoid")

class User {
  constructor(options = {}) {
    options = options || {}
    this.name = options.name
    this.id = options.id || nanoid()
    this.ipAddress = options.ipAddress
    this.created = options.created || new Date().valueOf()
    this.modified = options.modified || this.created
    this.identify = options.identify || 'student'
  }

  updateModified() {
    this.modified = new Date().valueOf()
    return this
  }

  updateUser(update) {
    Object.keys(update).forEach((key) => {
        this[key] = update[key]
    })
    return this.updateModified()
  }

  setUserName(name) {
    this.name = name
    return this.updateModified()
  }

  static init(options = {}) {
    if (options instanceof User) {
      return options
    }
    const instance = new User(options)
    return instance.isValid ? instance : null
  }
  static initFromArray(arr = []) {
    if (Array.isArray(arr)) {
      return arr.map(this.init)
    }
    return []
  }
  static initOnlyValidFromArray(arr = []) {
    return this.initFromArray(arr).filter((i) => i)
  }

  get isValid() {
    return !!this.name && !!this.id
  }
}


module.exports = {
  User
}
