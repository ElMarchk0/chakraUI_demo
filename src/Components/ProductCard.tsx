import { Badge, Box, Button, Image, Text } from '@chakra-ui/react'
import { Product } from '../App'

type Props = {
  item: Product
  addToCart: (item: Product) => void
}

const ProductCard: React.FC<Props> = ({item, addToCart}) => {
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' roundedTop="lg" padding="1em">
      <Image src={item.image} />
      <Box p='6' backgroundColor='gray.50' >
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>          
        </Box>

        <Box mt='1' fontWeight='semibold' as='h3' lineHeight='tight' isTruncated>
          {item.title}
        </Box>
        <Box>
          <Text as='h3' lineHeight='tight' isTruncated >
            {item.category}
          </Text>
          <Text lineHeight='tight' isTruncated > 
            {item.description}
          </Text>
        </Box>
        <Box>
          $ {item.price.toFixed(2)}
        </Box>
        <Box>
          <Button onClick={() => addToCart(item)}>Add Cart</Button>
        </Box>
        
      </Box>
    </Box>
  )
}

export default ProductCard