import { Box, Text, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, StackDivider, useDisclosure, VStack, Modal, ModalContent, ModalOverlay, ModalCloseButton, Wrap, Flex, WrapItem } from '@chakra-ui/react'
import ProductCard from './Components/ProductCard'
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query'
import Cart from './Components/Cart';
import CheckOutForm from './Components/CheckOutForm';

const fakeStoreApi = 'https://fakestoreapi.com/products';

export type Product = {
  title: string,
  price: number,
  quantity: number,
  image: string,
  description: string,
  category: string,
  id: number
}

// Api call to get products
const getProducts = async (): Promise<Product[]> =>  {
  const res = await axios.get(fakeStoreApi);
  const data = res
  return data.data
}

const App = () => {
  // Open and close functions for the drawer and modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  // Cart state
  const [cartItems, setCartItems] = useState([] as Product[])
  const {data} = useQuery<Product[]>(
    'products',
    getProducts
  )
  // Get subtotal of items check the quantity of each item
  const getSubtotal = (items: Product[]) => { 
    return items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0
  )}
  // get total number of items in cart
  const totalItems = (items: Product[]) => items.reduce((sum: number, item: Product) => sum + item.quantity, 0)

  // Add item to cart and increase quantity if item already exists
  const addToCart = (item: Product) => {
    setCartItems(prev => {
      const isInCart = prev.find(i => i.id === item.id)
      if (isInCart) {
        return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i)
      }
      // add cartitems to local storage
      return [...prev, {...item, quantity: 1}]
    })
  }

  const removeFromCart = (id: number) => setCartItems(items => items.filter(item => item.id !== id))  
  // increment and decrement quantity of item
  const incrementQuantity = (id: number) => setCartItems(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item))  
  const decrementQuantity = (id: number) => setCartItems(prev => prev.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item))       
  
  return (
    <Flex alignItems='center' justifyContent='center' w='100%'>
      {/* Modal */}
      <Modal blockScrollOnMount={false} isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <CheckOutForm getSubtotal={getSubtotal} cartItems={cartItems} />
        </ModalContent>
      </Modal>
      {/* SideBar */}
      <Drawer onClose={onClose} isOpen={isOpen} placement='left'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} incementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}/>    
            {/* Show subtotal and total number of items */}
            {cartItems.length === 0 ? <h3>Cart is empty</h3> : 
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' roundedTop='lg' padding={3}>              
              <Text>
                Subtotal: $ {getSubtotal(cartItems).toFixed(2)}
              </Text>
              <Text>
                Number of Items: {totalItems(cartItems)}
              </Text>
              <Button onClick={onModalOpen}>
                Checkout
              </Button>
            </Box>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>      
      <VStack divider={<StackDivider borderColor='gray.200' />} w='100%' spacing={10} align='center' direction='row' >
        {/* Navbar Element */}
        <Box  backgroundColor='#333' position='fixed' w='100%' zIndex='2'>
          <Button float='left' marginLeft='4em' onClick={onOpen} margin='5px 3px 5px 20px'>
            Open Cart
          </Button>
        </Box>
        
        {/* Grid */}
        <Box margin='6em'>
          <Wrap spacing='20px' justify='center' width='100%'>
            {data?.map(item =>  
              <WrapItem margin='5em'>
                <ProductCard item={item} key={item.id} addToCart={addToCart}/>
              </WrapItem>
            )}
          </Wrap>
        </Box>
      </VStack>
    </Flex>
  )
}

export default App