import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { Image, Stack, Heading, Divider } from "@chakra-ui/react";

import { LatestArticleProps } from '@/lib/api/articles';

const NewsItem = ({ article } : {article : LatestArticleProps}) => {
    return <Card w="100%">
        <CardBody borderBottom={article.scores.compound > 0.2 ? "4px": "0px "} borderColor="green.200">
            <Image
            src={article.image}
            alt=''
            borderRadius='lg'
            w="100%"
            />
                <Stack mt='6' spacing='3'>
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