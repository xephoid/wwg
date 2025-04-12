import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Navbar, NavbarBrand } from 'reactstrap';
import CharacterSheet from './CharacterSheet';
import TextWindow from './TextWindow';
import { INTRODUCTION } from '../lib/introduction';
import '../styles/App.css';
import { LOCATIONS } from '../lib/locations';

export default function App(props) {
  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    race: "",
    level: 1,
    xp: 0,
    credits: 200,
    abilityScores: [],
    move: 3,
    range: 1,
    basicSkills: [],
    advancedSkills: [],
    weapon: null,
    armor: null,
    consumables: [],
    ship: {
      name: "",
      capacity: 3,
      speed: 1,
      handling: 1,
      damage: 1,
      parts: []
    },
    crew: []
  });

  const [currentHabitat, setCurrentHabitat] = useState(LOCATIONS[0]);
  const [gameState, setGameState] = useState('CHARACTER_CREATION_STEP_NAME');
  const [messages, setMessages] = useState([{ text: INTRODUCTION, type: 'assistant' }]);

  return (
    <div className="app-container">
      <Navbar color="dark" dark expand="md" className="main-navbar">
        <NavbarBrand href="/" className="game-title">Warble Way Galaxy</NavbarBrand>
      </Navbar>
      <Container fluid>
        <Row className="main-content">
          <Col md={3}>
            <CharacterSheet className="character-sheet" playerInfo={playerInfo} />
          </Col>
          <Col md={8} className="text-section">
            <TextWindow 
              messages={messages}
              playerInfo={playerInfo}
              setPlayerInfo={setPlayerInfo}
              gameState={gameState}
              setGameState={setGameState}
              setMessages={setMessages}
              currentHabitat={currentHabitat}
              setCurrentHabitat={setCurrentHabitat}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}