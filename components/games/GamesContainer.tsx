import React from "react";
import GameList from "./GameList";
import { useGamesQuery, useDeleteGameMutation } from "../../generated/graphql";
import {queryClient} from "../../pages/_app";

const GamesContainer: React.FC = () => {

    const currentUserQuery: any = queryClient.getQueryData('CurrentUser')
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
      return <span>{error?.message}</span>
    }
    const getUserRoles = () => {
        const userRoles = currentUserQuery?.currentUser?.roles
        if(!userRoles) {
            return []
        }
        return userRoles
    }
    return (
        <div>
            {getUserRoles().includes('USER') && <span>User</span>}
            {getUserRoles().includes('ADMIN') && <span>Admin</span>}
            {getUserRoles().includes('SUPER_ADMIN') && <span>Super admin</span>}
            {data && <GameList games={data.games} onDelete={onDelete}/>}
        </div>
    )
}

export default GamesContainer