import React from 'react';
import { Col, Row } from 'reactstrap';

export default function CharacterSheet(props) {
  const { playerInfo } = props;

  return(
    <Col className="space-up-top" md={2}>
      <Row>
        Name: {playerInfo.name}
      </Row>
      <Row>
        Race: {playerInfo.race}
      </Row>
      <Row>
        Ability Scores: {playerInfo.abilityScores.map((abilityScore) => <span> {abilityScore.ability} +{abilityScore.score}</span> )}
      </Row>
    </Col>
  );
};