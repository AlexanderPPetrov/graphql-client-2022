import React from "react";
import { ListGroup } from "react-bootstrap";
import { Game } from "../../generated/graphql";
import GameListItem from "./GameListItem";

interface Props {
    games: Game[],
    onDelete: (_id: string) => void
}

const GameList: React.FC<Props> = ({games, onDelete}) => {
    return (
        <ListGroup>
            {games.map(game => (
                <GameListItem key={game._id} game={game} onDelete={onDelete}/>
            ))}
        </ListGroup>
    )
}

export default GameList