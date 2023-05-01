import Head from 'next/head'
import { GetStaticProps } from 'next'

import Navbar from '@/components/Navbar'
import Latest from '@/components/Latest'
import { Box, Flex, Text } from '@chakra-ui/react'

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
      <Navbar  />
      <Box w={["90%","90%","80%"]} m={"0 auto"} mt={4}>
        {/* <Latest latestArticles={latestArticles.filter(article => article.scores.compound > 0)} /> */}
        <Latest latestArticles={latestArticles} />
      </Box>
      <Flex my={8} justifyContent={"center"}>
        <Text color="gray.700">
          &copy; Copyright 2023, Safal Shrestha
          </Text>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await getLatestArticles();
  const results = JSON.parse(JSON.stringify(res))

  return {
    props: {
      latestArticles: results
    },
    revalidate: 10
  };
};