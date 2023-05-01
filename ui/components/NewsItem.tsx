import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { Image, Stack, Heading, Divider } from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';

import { LatestArticleProps } from '@/lib/api/articles';

const NewsItem = ({ article, threshold } : {article : LatestArticleProps, threshold: number}) => {
    return <Card w="100%" position={"relative"}>
        {article.greenwashing == 1 && <WarningIcon position={"absolute"} right={-1} top={-1} w={8} h={8} color="yellow.400" />}
        <CardBody bg={article.scores.compound >= threshold ? "#dbffe6": ""}>
            <Image
            src={article.image}
            fallbackSrc='https://via.placeholder.com/100'
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