import {
	Heading,
	Text,
	Flex,
	Button,
	Box,
	Stack,
	Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

const PageNotFound = () => {
	const navigation = useNavigate();
	return (
		<Box my={2}>
			<Stack maxW="md" mx="auto">
				<Stack align="center" gap={5}>
					<Heading as="h2" size="4xl" mt="24px" py={4}>
						404 page
					</Heading>
					<Text fontSize="xl" fontWeight="bold" py={8} textAlign="center">
						The page you are looking for is not found
					</Text>
					<Flex w="100%" justify="center" py={8}>
						<Button
							alignSelf="flex-start"
							borderRadius="full"
							bg="brand.blackCard"
							display="flex"
							gap={2}
							color="brand.white"
							_hover={{
								bg: 'brand.pink',
								color: 'brand.bgBlack',
								'.houseIcon': {
									color: 'brand.bgBlack',
								},
							}}
							onClick={() => navigation(-1)}
							transition={'all 0.3s ease'}
						>
							<Icon
								transition={'all 0.3s ease'}
								as={MdArrowBack}
								className="houseIcon"
								boxSize={5}
								color="brand.pink"
							/>
							<Text>{'Back to Home'}</Text>
						</Button>
					</Flex>
				</Stack>
			</Stack>
		</Box>
	);
};

export default PageNotFound;
