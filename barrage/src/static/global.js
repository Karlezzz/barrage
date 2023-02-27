let historyBG = String(localStorage.getItem("BG"))
let historyIsSun = localStorage.getItem('ISSUN')==='true'?true:false
let historyIsCleanBG = localStorage.getItem('ISCLEANBG')==='true'?true:false


let isSun = historyIsSun!=null ? historyIsSun : true
let isCleanBG = historyIsCleanBG!=null ? historyIsCleanBG : false
let staticBG = historyBG ? historyBG : 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'


function getIsSun() {
    return this.isSun
}

function setIsSun(value) {
    this.isSun = !this.isSun
}

function getIsCleanBG() {
    return this.isCleanBG
}

function setIsCleanBG(value) {
    this.isCleanBG = !this.isCleanBG
}

function getStaticBG() {
    return this.staticBG
}

function setStaticBG(value) {
    this.staticBG = value
}

export default {
    isSun,
    getIsSun,
    setIsSun,
    isCleanBG,
    getIsCleanBG,
    setIsCleanBG,
    staticBG,
    getStaticBG,
    setStaticBG
}