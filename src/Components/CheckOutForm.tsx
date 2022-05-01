import { Box, FormControl, FormLabel, UnorderedList, Text, Input, ModalBody, ModalHeader,  Select,  Tabs, Tab, TabList, TabPanels, TabPanel, Button } from '@chakra-ui/react'
import { FC } from 'react'
import { Product } from '../App'

type Props = {
  cartItems: Product[]
  getSubtotal: (cartItems: any) => number
}

const CheckOutForm: FC<Props> = ({cartItems, getSubtotal}) => {
  return (
    <ModalBody >
      <ModalHeader>Checkout</ModalHeader>
      <UnorderedList>
        {cartItems.map(item => (
          <>
            <Box padding={2}>
              <Text isTruncated>{item.title}</Text>
              <Text>$ {(item.price * item.quantity).toFixed(2)}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </Box>
          </>
        ))}
      </UnorderedList>
      <Box padding={4}>
        <Text>Subtotal: $ {getSubtotal(cartItems).toFixed(2)}</Text>
        <FormControl>
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab>Personal Details</Tab>
            <Tab>Payment Details</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormLabel htmlFor='name'>Name</FormLabel>
              <Input size="md" id='name' type='name' required/>
              <FormLabel htmlFor='email'>Email address</FormLabel>
              <Input size="md" id='email' type='email' required/>
              <FormLabel htmlFor='address'>Address</FormLabel>
              <Input size="md" id='address' type='address' required/>
              <FormLabel htmlFor='city'>City</FormLabel>
              <Input size="md" id='city' type='city' required/>
              <FormLabel htmlFor='state'>State/Province</FormLabel>
              <Input size="sm" id='state' type='state' required/>
              <FormLabel htmlFor='postal'>Postal Code</FormLabel>
              <Input size="sm" id='postal' type='postal' required/>
              <FormLabel htmlFor='country'>Country</FormLabel>
              <Select id='country' placeholder='Select a Country'>
                <option value='CA'>Canada</option>
                <option value='USA'>United States</option>
                <option value='MX'>Mexico</option>
              </Select>
            </TabPanel>
            <TabPanel>
              <FormLabel htmlFor='cardname'>Name on Card</FormLabel>
              <Input id='cardname' type='cardname' required/>
              <FormLabel htmlFor='cardnumber'>Card Number</FormLabel>
              <Input id='cardnumber' type='cardnumber' required/>
              <FormLabel htmlFor='exp'>Expiry Date</FormLabel>
              <Input size="xs" id='exp' type='exp' required/>
              <FormLabel htmlFor='cvv'>CVV</FormLabel>
              <Input size="xs" id='cvv' type='cvv' required/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Button>Submit Order</Button>
        </FormControl>
      </Box>
    </ModalBody>
  )
}

export default CheckOutForm