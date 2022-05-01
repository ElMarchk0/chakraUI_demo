import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from "react-dom/client";
import App from "./App"

import { QueryClient, QueryClientProvider} from 'react-query'
const client = new QueryClient();
const container = document.getElementById('root')!;
const root = createRoot(container)

root.render(
  <ChakraProvider>
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>  
  </ChakraProvider>
)
