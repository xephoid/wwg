import React from 'react';
import { Input, Button } from "reactstrap";
import { ABILITIES } from '../../lib/abilities';

export default function CharacterCreationAbilities(props) {
  const { scoreAmount, playerInfo, setPlayerInfo, setGameState, messages, setMessages } = props; 
    return (
        <>
          <div>What is your character {scoreAmount == 3 ? "really good" : scoreAmount == 2 ? "pretty good" : "ok"} at?</div>
          {ABILITIES
            .filter((a) => !playerInfo.abilityScores.find((s) => s.ability == a.id))
            .map((a) => <Button onClick={() => {
              const newPlayerInfo = { ...playerInfo };
              newPlayerInfo.abilityScores[Math.abs(3 - scoreAmount)] = { ability: a.id, score: scoreAmount };
              setPlayerInfo(newPlayerInfo);
            }}>{a.name}</Button>)}
          <Button onClick={() => {
            setGameState(scoreAmount > 1 ? 'CHARACTER_CREATION_STEP_SCORES_' + (scoreAmount - 1) : 'CHARACTER_CREATION_STEP_SHIP_NAME');
          }}>Submit</Button>
        </>
      )
}