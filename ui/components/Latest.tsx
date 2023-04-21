import { Spinner, Text } from "@chakra-ui/react"
import { Grid, SimpleGrid } from "@chakra-ui/react";

import NewsItem from "./NewsItem";
import { LatestArticleProps } from "@/lib/api/articles";

const Latest = ({ latestArticles }: {latestArticles: LatestArticleProps[]}) => {
    return (
        <>
            <Text py={4} 
                color={"black.100"}
                fontSize={32} 
                fontWeight={"bold"}>
                    Latest News
            </Text>
            <SimpleGrid columns={[1, null, 2, 3]} gap={6}>   
                {latestArticles.map(article => {
                    if (article.scores.compound > 0) return <NewsItem key={article._id} article={article} />
                })}
            </SimpleGrid>
        </>
    )
}

export default Latest;