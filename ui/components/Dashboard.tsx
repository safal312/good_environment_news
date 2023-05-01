import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Grid,
    GridItem,
    Input,
    Show,
    Text
} from '@chakra-ui/react'

import { ChangeEvent, useEffect, useState } from 'react'

import NewsContentChart from './NewsContentChart'
import SourcesPieChart from './SourcesPieChart'
import KeywordPieChart from './KeywordPieChart'
import { LatestArticleProps } from '@/lib/api/articles'

const Dashboard = ({isOpen, onClose, latestArticles, threshold}: {isOpen: boolean, onClose: () => void,
                    latestArticles: LatestArticleProps[], threshold: number}) => {

    const [inputValue, setInputValue] = useState("")
    const [debouncedValue, setDebouncedValue] = useState("")

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleKeywordChart = (inputValue: string) => {
        console.log(inputValue)
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            handleKeywordChart(inputValue)
            setDebouncedValue(inputValue)
        }, 500);

        return () => clearInterval(interval)
    }, [inputValue])

    return (
        <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
        <Modal isOpen={isOpen} onClose={onClose} size={"full"} >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Dashboard</ModalHeader>
            <ModalCloseButton />
            <ModalBody m="0 auto" w="90%" h="20vh">
                <Grid
                    templateRows={[null, null, 'repeat(3, 1fr)','repeat(2, 1fr)']}
                    templateColumns={[null, null, 'repeat(1, 1fr)','repeat(3, 1fr)']}
                    gap={4}
                    >
                    <Show above='md'>
                        <GridItem boxShadow={"base"} rowSpan={1} colSpan={1} bg='gray.50'>
                            <SourcesPieChart data={latestArticles} threshold={threshold} />
                            {/* <NewsContentChart data={latestArticles} threshold={threshold} /> */}
                        </GridItem>
                    </Show>
                    <GridItem boxShadow={"base"} rowSpan={2} colSpan={2} bg='gray.50' p={4}>
                        <Text fontSize={"lg"} color={"teal.500"}>Search for a topic below:</Text>
                        <Input w={["80%", "40%"]} mt={2} value={inputValue} onChange={handleInput} placeholder='Enter keyword to filter articles with. Default value looks at all articles' /> 
                        <KeywordPieChart data={latestArticles} threshold={threshold} keyword={debouncedValue} />
                        {/* <NewsContentChart data={latestArticles} threshold={threshold} /> */}
                    </GridItem>
                    <Show above='md'>
                        <GridItem boxShadow={"base"} rowSpan={1} colSpan={1} bg='gray.50'>
                            <NewsContentChart data={latestArticles} threshold={threshold} />
                        </GridItem>
                    </Show>
                </Grid>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default Dashboard