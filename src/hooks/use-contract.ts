import { useMemo } from 'react'

import { AddressZero } from '@ethersproject/constants'
import { Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { Contract, ContractInterface, Signer } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

export function getContract<T = Contract>(
  address: string,
  abi: ContractInterface,
  provider: Signer | Provider,
) {
  return <T>(<unknown>new Contract(address, abi, provider))
}

export function useContract<Contract = any>(
  address: string,
  abi: ContractInterface,
) {
  const { library } = useWeb3React()

  const signerOrProvider = useMemo(() => {
    if (library?.getSigner) {
      return library.getSigner()
    } else {
      return library
    }
  }, [library])

  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  const contract = useMemo(
    () => getContract<Contract>(address, abi, signerOrProvider),
    [address, abi, signerOrProvider],
  )

  return contract
}
