import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import CharacterCreationName from './inputs/CharacterCreationName';
import CharacterCreationRace from './inputs/CharacterCreationRace';
import CharacterCreationAbilities from './inputs/CharacterCreationAbilities';
import CharacterCreationShipName from './inputs/CharacterCreationShipName';
import HabitatIntro from './HabitatIntro';

export default function InputSection(props) {
  const {gameState} = props;
  return (
    <Col md={12}>
      <Row>
        { gameState == 'CHARACTER_CREATION_STEP_NAME' ? <CharacterCreationName {...props} /> : ""}
        { gameState == 'CHARACTER_CREATION_STEP_RACE' ? <CharacterCreationRace {...props} /> : ""}
        { gameState == 'CHARACTER_CREATION_STEP_SCORES_3' ? <CharacterCreationAbilities scoreAmount={3} {...props} /> : ""}
        { gameState == 'CHARACTER_CREATION_STEP_SCORES_2' ? <CharacterCreationAbilities scoreAmount={2} {...props} /> : ""}
        { gameState == 'CHARACTER_CREATION_STEP_SCORES_1' ? <CharacterCreationAbilities scoreAmount={1} {...props} /> : ""}
        { gameState == 'CHARACTER_CREATION_STEP_SHIP_NAME' ? <CharacterCreationShipName {...props} /> : ""}
        { gameState == 'HABITAT_INTRO' ? <HabitatIntro {...props} /> : ""}
      </Row>
    </Col>
  );
}