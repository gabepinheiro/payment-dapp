import { useEffect, useState } from 'react'
import { useContract } from './use-contract'
import { useWeb3React } from '@web3-react/core'

import PaymentTokenContract from '../../abis/PaymentToken.json'

import { utils } from 'ethers'
import { EthersError, getParsedEthersError } from '@enzoferey/ethers-error-parser'

const CONTRACT_ADDRESS = '0x87Ed266b0D7E405ddFCa307aA06A2eE901a100f0'

interface SendPaymentProps {
  amount: any
  toAddress: string
}

export function usePaymentToken() {
  const contract = useContract(CONTRACT_ADDRESS, PaymentTokenContract.abi)
  const { account } = useWeb3React()

  const [balance, setBalance] = useState('')

  useEffect(() => {
    async function balanceOf(account: string) {
      const balance = await contract.balanceOf(account)
      const value = utils.formatEther(balance.toString())
      setBalance(value)
    }

    async function load() {
      if (!account) return
      await balanceOf(account)
    }

    load()
  }, [account, contract])

  async function sendPayment({ amount, toAddress }: SendPaymentProps) {
    try {
      const amountInWei = utils.parseEther(amount).toString()
      const balance = await contract.balanceOf(account)
      const balanceInWei = utils.formatEther(balance.toString())

      if (balanceInWei < amountInWei) {
        return "You don't have enough balance"
      }

      const tx = await contract.transfer(toAddress, amountInWei)
      await tx.wait()

      const newBalance = await contract.balanceOf(account)
      setBalance(utils.formatEther(newBalance.toString()))
      return 'Payment success'
    } catch (e) {
      const parsedEthersError = getParsedEthersError(e as EthersError)
      return parsedEthersError.context
    }
  }

  return {
    balance,
    sendPayment,
  }
}
