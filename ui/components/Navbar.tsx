import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react"

const Navbar: () => JSX.Element = () => {
    return (
        <Box p={2} bg={"green.400"} lineHeight={10} textAlign={"center"} verticalAlign={"center"}>
            <Text py={4} 
            color={"green.100"}
            fontSize={32} 
            fontWeight={"extrabold"}>
                goodenvironmentnews.com
            </Text>
        </Box>
    )
}

export default Navbar