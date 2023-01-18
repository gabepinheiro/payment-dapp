import { createContext, ReactNode, useContext, useState } from 'react'
import Web3 from 'web3'
import PaymentToken from '../../../abis/PaymentToken.json'

declare let window: any

// transaction hash: 0xa4bc0b82cb437d15b84cc91e4162c1dd493244b8020fb6615f7dabaa82cb9d8c
// contract address 0x87Ed266b0D7E405ddFCa307aA06A2eE901a100f0

interface SendPaymentProps {
  amount: any
  toAddress: string
}

export type SendPaymentFuntion = (args: SendPaymentProps) => Promise<any>

interface DataContextProps {
  account: string
  loading: boolean
  loadWallet: () => Promise<void>
  sendPayment: SendPaymentFuntion
  balance: number
}

interface DataProviderProps {
  children: ReactNode
}

const DataContext = createContext<DataContextProps | null>(null)

export function DataProvider({ children }: DataProviderProps) {
  const data = useProviderData()

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export function useProviderData() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState('')
  const [paymentToken, setPaymentToken] = useState<any>()
  const [balance, setBalance] = useState(0)

  async function loadWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      const web3 = window.web3

      const accounts = await web3.eth.requestAccounts()
      setAccount(accounts[0])

      const paymentTokenData = PaymentToken.networks['80001']
      if (paymentTokenData) {
        const paymentTokenInstance = new web3.eth.Contract(
          PaymentToken.abi,
          paymentTokenData.address,
        )
        setPaymentToken(paymentTokenInstance)
        console.log(paymentTokenInstance)
        const bal = await paymentTokenInstance.methods
          .balanceOf(accounts[0])
          .call()
        setBalance(bal)
      } else {
        window.alert('Testnet not found')
      }
      setLoading(false)
    } else {
      window.alert('Non-Eth browser detected. Please consider using MetaMask')
    }
  }

  async function sendPayment({ amount, toAddress }: SendPaymentProps) {
    try {
      const amountInWei = window.web3.utils.toWei(amount, 'ether')
      const bal = await paymentToken.methods.balanceOf(account).call()
      if (bal < amountInWei) {
        return "You don't have enough balance"
      }

      const txHash = await paymentToken.methods
        .transfer(toAddress, amountInWei)
        .send({
          from: account,
        })

      const newBalance = await paymentToken.methods.balanceOf(account).call()
      setBalance(newBalance)
      return 'Payment success'
    } catch (e) {
      if (e instanceof Error) {
        return e.message
      }
    }
  }

  return {
    account,
    loading,
    loadWallet,
    sendPayment,
    balance,
  }
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData hook must be used within a UserAuthProvider')
  }

  return context
}
