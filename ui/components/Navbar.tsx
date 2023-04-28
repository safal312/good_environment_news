import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react"

const Navbar: () => JSX.Element = () => {
    return (
        <Box p={2} lineHeight={10} textAlign={"center"} verticalAlign={"center"}>
            <Text py={4} 
            color={"green.400"}
            fontSize={[24, 32]} 
            fontWeight={"extrabold"}>
                goodenvironmentnews
            </Text>
        </Box>
    )
}

export default Navbar