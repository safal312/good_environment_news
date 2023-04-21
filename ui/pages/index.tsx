import Head from 'next/head'

import Navbar from '@/components/Navbar'
import Latest from '@/components/Latest'
import { Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Good Environment News</title>
        <meta name="description" content="Collection of only good environment news" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Box w={"80%"} m={"0 auto"} mt={4}>
        <Latest />
      </Box>
    </>
  )
}
