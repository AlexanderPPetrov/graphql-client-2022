import type {NextPage} from 'next'
import Layout from '../components/games/layouts/Default'
import GamesContainer from '../components/games/GamesContainer'
import LoginForm from "../components/LoginForm";
import {Button} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useCurrentUserQuery} from "../generated/graphql";
import {queryClient} from "./_app";

const Home: NextPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {data, isLoading, error, refetch} = useCurrentUserQuery(undefined, {
        refetchOnWindowFocus: false,
        retry: 1,
    });
    return (
        <div>
            <Layout>
                {data?.currentUser?._id && <Button onClick={() => {
                    removeCookie('token', {path: '/'});
                    //Remove previous data
                    queryClient.removeQueries('CurrentUser')
                    //Move to the end of the callstack
                    setTimeout(() => {
                        refetch()
                    })
                }}>Logout</Button>}
                {!data?.currentUser?._id && <LoginForm/>}
                <GamesContainer/>
            </Layout>
        </div>
    )
}

export default Home
