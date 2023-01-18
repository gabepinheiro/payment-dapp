import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Head>
        <title>Payment DApp</title>
      </Head>
      <h1 className='text-3xl text-blue-500'>Nextjs Boilerplate with Typescript, Web3.js, Truffle, TailwindCSS, Storybook and Jest/Testing-Library</h1>
    </div>
  )
}

export default Home
