import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'

import NewsContentChart from './NewsContentChart'
import { LatestArticleProps } from '@/lib/api/articles'

const Dashboard = ({isOpen, onClose, latestArticles, threshold}: {isOpen: boolean, onClose: () => void,
                    latestArticles: LatestArticleProps[], threshold: number}) => {
    return (
        <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Dashboard</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <NewsContentChart data={latestArticles} threshold={threshold} />
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default Dashboard