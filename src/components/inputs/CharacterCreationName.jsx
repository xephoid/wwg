import React from 'react';
import { Input, Button } from "reactstrap";

export default function CharacterCreationName(props) {
  const { playerInfo, setPlayerInfo, setGameState, messages, setMessages } = props; 
    return (
        <>
          <Input placeholder="Enter your character's name" onChange={(event) => { 
            const newPlayerInfo = { ...playerInfo };
            newPlayerInfo.name = event.target.value;
            setPlayerInfo(newPlayerInfo) 
          }}></Input>
          <Button onClick={() => {
            const newMessages = [...messages, { text: "Your character's name is: " + playerInfo.name, type: 'user' }];
            setMessages(newMessages);
            setGameState('CHARACTER_CREATION_STEP_RACE');
          }}>Submit</Button>
        </>
      )
}