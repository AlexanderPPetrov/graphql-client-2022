import type { NextPage } from 'next'
import Layout from '../components/games/layouts/Default'
import GamesContainer from '../components/games/GamesContainer'
import LoginForm from "../components/LoginForm";
import {Button} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {useCurrentUserQuery} from "../generated/graphql";

const Home: NextPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {data, isLoading, error, refetch} = useCurrentUserQuery({}, {
        refetchOnWindowFocus: false,
        retry: 1,
    });
    console.log('--->', {data, isLoading, error})
    return (
    <div >
      <Layout>
          {data?.currentUser?._id && <Button onClick={() => {
              removeCookie('token')
              refetch()
          }}>Logout</Button>}
          {!data?.currentUser?._id && <LoginForm/>}
        <GamesContainer/>
      </Layout>
    </div>
  )
}

export default Home
