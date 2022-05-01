import { Box, Text, Button, SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import { Product } from '../App'

type Props = {
  cartItems: Product[]
  removeFromCart: (id: number) => void
  incementQuantity: (id: number) => void
  decrementQuantity: (id: number) => void
}

const Cart: FC<Props> = ({cartItems, removeFromCart, incementQuantity, decrementQuantity}) => {
  return (
    <> 
      {cartItems.map(item => (
        <>
          <SimpleGrid columns={1}>
            <Box marginBottom={5} borderWidth='1px' borderRadius='lg' overflow='hidden' roundedTop="lg" padding={3}>
              <Text fontSize='xl' isTruncated>{item.title}</Text>
              <Text>$ {(item.price * item.quantity).toFixed(2)}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Button margin={2} onClick={() => incementQuantity(item.id)}>+</Button>
              {/* Hide decrement button if quantity is equal to one */}
              {item.quantity > 1 && <Button margin={2} onClick={() => decrementQuantity(item.id)}>-</Button>}
              <Button margin={2} onClick={() => removeFromCart(item.id)}>Remove Item</Button>
            </Box>
          </SimpleGrid>
        </>
      ))}
    </>
  )
}

export default Cart