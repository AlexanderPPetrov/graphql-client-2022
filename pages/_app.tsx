import React from "react"
import type { AppContext, AppProps} from 'next/app'
import {QueryClient, QueryClientProvider, Hydrate, useQuery} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContextProvider from "../context/AppContextProvider";
import { parseCookies } from "../helpers/cookie";
import App from 'next/app'
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryVariables,
} from "../generated/graphql";
import {fetchData} from "../fetcher/fetcher";

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </Hydrate>
    <ReactQueryDevtools/>
  </QueryClientProvider>
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx.req)
  const parsedToken = cookies?.token ?? '';
  const _queryClient = new QueryClient()
  try {
    await _queryClient.prefetchQuery(
        'getCurrentUser',
        fetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {}, parsedToken),
    )
  } catch (e) {
    console.log(e);
  }
  return { ...appProps }
}

export default MyApp
