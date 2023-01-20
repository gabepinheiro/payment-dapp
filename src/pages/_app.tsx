import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Web3ReactProvider } from '@web3-react/core'
import { ExternalProvider, Web3Provider } from '@ethersproject/providers'

const getLibrary = (provider: ExternalProvider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
