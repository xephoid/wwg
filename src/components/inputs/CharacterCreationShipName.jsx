import React from 'react';
import { Input, Button } from "reactstrap";

export default function CharacterCreationShipName(props) {
  const { playerInfo, setPlayerInfo, setGameState, messages, setMessages } = props; 
    return (
        <>
          <Input placeholder="Enter your space ship's name" onChange={(event) => { 
            const newPlayerInfo = { ...playerInfo };
            newPlayerInfo.ship.name = event.target.value;
            setPlayerInfo(newPlayerInfo) 
          }}></Input>
          <Button onClick={() => {
            const newMessages = [ ...messages, "Your ship's name is: " + playerInfo.ship.name ];
            setMessages(newMessages);
            setGameState('HABITAT_INTRO');
          }}>Submit</Button>
        </>
      )
}