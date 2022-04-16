import React from "react"
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>
  <Hydrate state={pageProps.dehydratedState}>
    <Component {...pageProps} />
  </Hydrate>
  <ReactQueryDevtools />
</QueryClientProvider>
}

export default MyApp
