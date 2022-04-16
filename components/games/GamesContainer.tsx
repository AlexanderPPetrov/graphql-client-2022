import React from "react";
import GameList from "./GameList";
import { useGamesQuery, useDeleteGameMutation } from "../../generated/graphql";

const GamesContainer: React.FC = () => {

    const { isLoading, isError, data, error, refetch } = useGamesQuery({})
    const { mutate} = useDeleteGameMutation({
      onSuccess: () => {
        refetch()
      }
    })

    function onDelete(_id: string) {
      mutate({id : _id})
    }

    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (error) {
      return <span>Error: {error?.message}</span>
    }
    return (
        <div>
            {data && <GameList games={data.games} onDelete={onDelete}/>}
        </div>
    )
}

export default GamesContainer