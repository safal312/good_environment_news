import Head from 'next/head'
import { GetStaticProps } from 'next'

import Navbar from '@/components/Navbar'
import Latest from '@/components/Latest'
import { Box } from '@chakra-ui/react'

import { getLatestArticles, LatestArticleProps } from '@/lib/api/articles'

export default function Home({ latestArticles }: {latestArticles: LatestArticleProps[]}) {
  return (
    <>
      <Head>
        <title>Good Environment News</title>
        <meta name="description" content="Collection of only good environment news" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Navbar />
      <Box w={"80%"} m={"0 auto"} mt={4}>
        <Latest latestArticles={latestArticles} />
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const results = await getLatestArticles();

  return {
    props: {
      latestArticles: results
    },
    revalidate: 10
  };
};