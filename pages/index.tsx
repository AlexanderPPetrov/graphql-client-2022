import type { NextPage } from 'next'
import Layout from '../components/games/layouts/Default'
import GamesContainer from '../components/games/GamesContainer'
import LoginForm from "../components/LoginForm";
import {useAppContext} from "../context/AppContext";
import {Button} from "react-bootstrap";
import {useCookies} from "react-cookie";

const Home: NextPage = () => {
    const {user, setUser} = useAppContext();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    return (
    <div >
      <Layout>
          {user._id && <Button onClick={() => {
              removeCookie('token')
              setUser({})
          }}>Logout</Button>}
          {!user._id && <LoginForm/>}
        <GamesContainer/>
      </Layout>
    </div>
  )
}

export default Home
