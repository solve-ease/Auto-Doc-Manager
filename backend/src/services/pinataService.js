const { PinataSDK } = require('pinata')
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: 'maroon-selective-kiwi-590.mypinata.cloud'
})
const auth = () => pinata.testAuthentication()
module.exports = {
  auth,
  pinata
}
