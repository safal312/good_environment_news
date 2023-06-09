import { Card, CardHeader, CardBody, Text, Tooltip } from '@chakra-ui/react'
import { Image, Stack, Heading, Divider } from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';

import { LatestArticleProps } from '@/lib/api/articles';

const NewsItem = ({ article, threshold } : {article : LatestArticleProps, threshold: number}) => {
    return <Card w="100%" position={"relative"}>
        {article.greenwashing == 1 && <Tooltip label="Potential Greenwashing"><WarningIcon cursor={"auto"} position={"absolute"} right={-1} top={-1} w={8} h={8} color="yellow.400" /></Tooltip>}
        <CardBody bg={article.scores.compound >= threshold ? "#dbffe6": ""}>
            <Image
            src={article.image}
            fallbackSrc='https://images.unsplash.com/photo-1497211419994-14ae40a3c7a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100'
            alt=''
            borderRadius='lg'
            w="100%"
            />
            <Stack mt='6' spacing='3' position={"relative"}>
                <Heading size='md'>{article.title}</Heading>
                <Text>
                    {article.body}
                </Text>
                <Text size="xs" color="gray.500">Source: {article.source}</Text>
            </Stack>
        </CardBody>
        <Divider />
    </Card>
}

export default NewsItem