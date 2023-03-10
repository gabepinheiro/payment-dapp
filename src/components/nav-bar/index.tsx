import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import Image from 'next/image'

const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 2, 3, 4, 5, 80001],
})

export function Navbar() {
  const { account, activate } = useWeb3React()

  async function loadWallet() {
    await activate(injectedConnector)
  }

  return (
    <>
      <header className='flex md:flex-row flex-col px-3 lg:px-10 justify-between items-center pt-5 space-y-2'>
        <div className='flex flex-row items-center'>
          <Image src='/polygon-logo.png' className='w-8 h-8 mr-3' alt='' width={32} height={32} />
          <span className='text-2xl font-bold text-white'>Polygon Network</span>
        </div>
        {account ? (
          <div className='flex flex-row space-x-3 items-center text-white text-lg'>
            <span>{account}</span>
            <div className='px-2 py-1 border-2 border-green-500 rounded-xl cursor-pointer text-center'>
              <span className='text-xl font-bold text-green-500'>Connected</span>
            </div>
          </div>
        ) : (
          <div className='px-2 py-1 border-2 border-red-500 rounded-xl cursor-pointer text-center' onClick={loadWallet}>
            <span className='text-xl font-bold text-red-500'>Connect</span>
          </div>
        )}
      </header>
    </>
  )
}
