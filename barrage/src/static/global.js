let isSun = true
let isCleanGB = false

function getIsSun() {
    return this.isSun
}

function setIsSun(value) {
    this.isSun = !this.isSun
}

function getIsCleanBG() {
    return this.isCleanGB
}

function setIsCleanBG(value) {
    this.isCleanGB = !this.isCleanGB
}

export default {
    isSun,
    isCleanGB,
    getIsSun,
    setIsSun,
    getIsCleanBG,
    setIsCleanBG
}