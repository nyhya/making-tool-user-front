const KEYS = {
    token: 'token'
}

const get = function (key, defaultValue = '') {
    let result = window.sessionStorage.getItem(key)
    return result === null ? defaultValue : result
}

const save = function (key, value) {
    console.log(key, value)
    window.sessionStorage.setItem(key, value)
}

const clear = function () {
    window.sessionStorage.clear()
}

const getToken = function () {
    return get(KEYS.token, null)
}

const saveToken = function (value) {
    save(KEYS.token, value)
}

export default { KEYS, get, save, clear, getToken, saveToken }