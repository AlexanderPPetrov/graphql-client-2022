import type { NextPage } from 'next'
import Layout from '../components/games/layouts/Default'
import GamesContainer from '../components/games/GamesContainer'

const Home: NextPage = () => {
  return (
    <div >
      <Layout>
        <GamesContainer/>
      </Layout>
    </div>
  )
}

export default Home
