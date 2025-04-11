import React, { useState } from 'react';
import { ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';


export default function CharacterCreationRace(props) {
  const { playerInfo, setPlayerInfo, setGameState, messages, setMessages } = props; 
  const [isOpen, setIsOpen] = useState(false);

  const valuePicked = (event) => {
    const newPlayerinfo = {...playerInfo};
    newPlayerinfo.race = event.target.value;
    setPlayerInfo(newPlayerinfo);
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  }

    return (
        <>
          <ButtonDropdown isOpen={isOpen} toggle={toggle}>
  <DropdownToggle caret color="primary">
    { playerInfo.race == "" ? "Race" : playerInfo.race }
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem value="Human" onClick={valuePicked}>Human</DropdownItem>
    <DropdownItem value="Kralkin" onClick={valuePicked}>Kralkin</DropdownItem>
    <DropdownItem value="Hexapod" onClick={valuePicked}>Hexapod</DropdownItem>
    <DropdownItem value="Grull" onClick={valuePicked}>Grull</DropdownItem>
  </DropdownMenu>
</ButtonDropdown>
          <Button onClick={() => {
            console.log("clicked!");
            const newMessages = [...messages, { text: "Your character's race is: " + playerInfo.race, type: 'user' }];
            setMessages(newMessages);
            setGameState('CHARACTER_CREATION_STEP_SCORES_3');
          }}>Submit</Button>
        </>
      )
}