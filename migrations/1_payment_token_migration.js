const PaymentToken = artifacts.require('PaymentToken')

module.exports = function (deployer) {
  deployer.deployer(PaymentToken)
}
