import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Navbar, NavbarBrand } from 'reactstrap';
import CharacterSheet from './CharacterSheet';
import TextWindow from './TextWindow';
import InputSection from './InputSection';
import { INTRODUCTION } from '../lib/introduction';

export default function App(props) {
  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    race: "",
    level: 1,
    xp: 0,
    credits: 200,
    abilityScores: [
      // { ability: 'SWA', score: 3 }
    ],
    move: 3,
    range: 1,
    basicSkills: [
      // 'You are exceptional at fighting with close range weapons. If you are adjacent to your target. Roll twice and take the higher number. If you are on the same tile as your target, but not adjacent, roll once'
    ],
    advancedSkills: [
      // 'Expert Combat tactics: You automatically succeed at ship takeover.'
    ],
    weapon: null,
    armor: null,
    consumables: [
      // { ability: 'SWA', score: 2 }
    ],
    ship: {
      name: "",
      capacity: 3,
      speed: 1,
      handling: 1,
      damage: 1,
      parts: []
    },
    crew: [
      // { name: "", race: "", abilityScores: {}, weapon: null, armor: null, basicSkills: [], advancedSkills: [] }
    ]
  });
  const [gameState, setGameState] = useState('CHARACTER_CREATION_STEP_NAME');
  const [messages, setMessages] = useState([INTRODUCTION]);

  return (
  <>
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Warble Way Galaxy</NavbarBrand>
    </Navbar>
    <Container>
      <Row>
        <CharacterSheet playerInfo={playerInfo} />
        <TextWindow messages={messages} />
        <Col md={2}>
            <Row>{gameState}</Row>
          </Col>
        <InputSection 
          playerInfo={playerInfo} 
          setPlayerInfo={setPlayerInfo} 
          gameState={gameState} 
          setGameState={setGameState}
          messages={messages}
          setMessages={setMessages}
          />
      </Row>
    </Container>
  </>
  );
}