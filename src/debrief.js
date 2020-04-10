const Web3 = require("web3");
const Web3Extend = require("web3-debrief-extend");
const Secp256k1 = require("secp256k1");
const CryptoJS = require('crypto-js')

var web3 = new Web3("http://34.229.57.51:10101");
Web3Extend.extend(web3);


exports.getUserInfo = function (address) {
    return web3.dbf.getUser(address);
}

exports.getUsers = function () {
    return web3.dbf.getUsers();
}

exports.getUsers = function () {
    return web3.dbf.getUsers();
}

exports.getBalance = function (address) {
    return web3.eth.getBalance(address).then(x => {
        return web3.utils.fromWei(x);
    })
}

exports.sign = function (data, privateKey) {
    return web3.eth.accounts.sign(data, privateKey)
}

exports.ecdh = function (privateKey, publicKey) {
    publicKey = Buffer.from("04" + publicKey.replace("0x", ""), "hex");
    privateKey = Buffer.from(privateKey.replace("0x", ""), "hex");
    return Secp256k1.ecdh(publicKey, privateKey);
}

exports.encrypt = function (data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}

exports.decrypt = function (ciphertext, key) {
    return CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
}

exports.register = function (privateKey, publicKey, nickname) {
    var data = "0x" + web3.dbf.buildRegisterData(nickname, Buffer.from(publicKey.replace("0x", ""), "hex")).toString("hex")
    var tx = {
        to: web3.dbf.consts.calls.register,
        data: data,
        gas: "100000",
        gasPrice: "1000000000",
    }
    return web3.eth.accounts.signTransaction(tx, privateKey).then(signTx => {
        return web3.eth.sendSignedTransaction(signTx.rawTransaction);
    })
}

