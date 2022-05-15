import React from "react"
import type {AppContext, AppProps} from 'next/app'
import {QueryClient, QueryClientProvider, Hydrate, useQuery, dehydrate} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import 'bootstrap/dist/css/bootstrap.min.css';
import {parseCookies} from "../helpers/cookie";
import App from 'next/app'
import {
    CurrentUserDocument,
    CurrentUserQuery,
    CurrentUserQueryVariables,
} from "../generated/graphql";
import {fetchData} from "../fetcher/fetcher";

export const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools/>
    </QueryClientProvider>
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const cookies = parseCookies(appContext.ctx.req)
    const parsedToken = cookies?.token ?? '';
    await queryClient.prefetchQuery(
        'CurrentUser',
        fetchData<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {}, parsedToken),
    )
    return {pageProps: {dehydratedState: dehydrate(queryClient)}};
}

export default MyApp
