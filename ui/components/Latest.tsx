import { Spinner, Text, Link, Center , Select, Flex, Switch, Stack, Spacer, Divider } from "@chakra-ui/react"
import { Grid, SimpleGrid, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import NewsItem from "./NewsItem";
import NewsContentChart from "./NewsContentChart";
import { LatestArticleProps } from "@/lib/api/articles";
import { ChangeEventHandler, ChangeEvent, SetStateAction } from "react";

const Latest = ({ latestArticles }: {latestArticles: LatestArticleProps[]}) => {
    const BASE_THRESHOLD = 0.2
    const [THRESHOLD, setTHRESHOLD] = useState(0.2)

    const [articles, setArticles] = useState(latestArticles.filter(article => article.scores.compound > THRESHOLD))
    const [searchQuery, setSearchQuery] = useState("")

    const useDebounce = function<T>(value: string, delay: number): string {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const timer = setTimeout(() => {
            setDebouncedValue(value)
            filterArticles(value.toLowerCase(), THRESHOLD)
            }, delay);
        
            return () => {
            clearTimeout(timer);
            };
        }, [value, delay]);

        return debouncedValue
    }

    const debouncedSearchQuery = useDebounce(searchQuery, 500)
    
    const searchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const filterArticles = (value: string, threshold: number) => {
        const new_articles = latestArticles.filter(article => {
            const keywordIncluded = article.title.toLowerCase().includes(value) || 
                article.body.toLowerCase().includes(value)  || article.source.toLowerCase().includes(value)
            return article.scores.compound > threshold && keywordIncluded
        })
        setArticles(new_articles)
    }

    const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.checked) {
            setTHRESHOLD(-10)
            filterArticles(searchQuery, -10)
            return
        }
        setTHRESHOLD(0.2)
        filterArticles(searchQuery, 0.2)
    }

    return (
        <Stack>
            <Text py={4} 
                color={"black.100"}
                fontSize={[24, 32]} 
                fontWeight={"bold"}>
                    Latest News
            </Text>
            <NewsContentChart data={latestArticles} threshold={BASE_THRESHOLD} />
            <Spacer />
            <Flex justifyContent={"space-between"} direction={['column', 'row']}>
                <InputGroup flex='3' mr='4' maxW={"50em"}>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='text' placeholder='Search for a keyword' value={searchQuery} onChange={searchQueryChange} />
                </InputGroup>
                <Spacer />
                <Stack direction={"row"} mt={["4", "0"]}>
                    <Text my={"auto"} color={"gray.500"}>Positivity filter: </Text>
                    <Switch onChange={handleSwitch} defaultChecked pt={["0", "3px"]} size={['md','lg']} colorScheme="teal" />
                </Stack>
            </Flex>
            {articles.length != 0 ? <SimpleGrid mt={8} mb={8} cursor={"pointer"} columns={[1, null, 2, 3]} gap={6}>
                    {articles.map(article => {
                        return (
                        <Link key={article._id} href={article.link} isExternal>
                            <NewsItem article={article} />
                        </Link>)
                    })}
                </SimpleGrid>
                : 
                <Center h='20vh' w='100%'>
                    <Text align={"center"} fontSize='2xl' color="gray.400">No Articles</Text>
                </Center>
            }
        </Stack>
    )
}

export default Latest;