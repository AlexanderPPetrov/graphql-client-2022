import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Game } from "../../generated/graphql";

interface Props {
    game: Game
    onDelete: (_id: string) => void
}

const GameListItem: React.FC<Props> = ({game, onDelete}) => {
    return (
        <ListGroup.Item>
            <div>{game.name}</div>
            <div>{game.description}</div>
            <div>{game.image}</div>
            <Button variant="danger" onClick={(e) => onDelete(game._id)}>Delete</Button>
        </ListGroup.Item>
    )
}

export default GameListItem
