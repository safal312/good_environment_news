import { Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { Image, Stack, Heading, Divider } from "@chakra-ui/react";

import { LatestArticleProps } from '@/lib/api/articles';

const NewsItem = ({ article } : {article : LatestArticleProps}) => {
    return <Card w="100%">
        <CardBody>
            <Image
            src={"https://aljazeera.com/" + article.image}
            alt=''
            borderRadius='lg'
            w="100%"
            />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{article.title}</Heading>
                    <Text>
                        {article.body}
                    </Text>
                </Stack>
        </CardBody>
        <Divider />
    </Card>
}

export default NewsItem