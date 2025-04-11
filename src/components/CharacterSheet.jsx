import React, { useState } from 'react';
import { Col, Row, Card, CardBody, Tooltip } from 'reactstrap';
import { ABILITIES } from '../lib/abilities';
import '../styles/CharacterSheet.css';

export default function CharacterSheet({playerInfo}) {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState({});
 
  const { 
    name, 
    race, 
    abilityScores, 
    ship, 
    credits, 
    xp
  } = playerInfo;

  const toggleTooltip = (abilityId) => {
    setTooltipOpen(prev => ({
      ...prev,
      [abilityId]: !prev[abilityId]
    }));
  };

  const getAbilityBasicSkill = (abilityId) => {
    const ability = ABILITIES.find(a => a.id === abilityId);
    return ability ? ability.basic : '';
  };

  const getAdvancedSkills = () => {
    return abilityScores
      .filter(score => score.score === 3)
      .map(score => {
        const ability = ABILITIES.find(a => a.id === score.ability);
        return {
          name: ability.name,
          description: ability.advanced
        };
      });
  };

  return (
      
        <Card className="character-card">
          <CardBody>
            <div className="character-header">
              <h2 className="character-name">{name}</h2>
              <div className="character-race">{race}</div>
            </div>

            <div className="character-resources">
              <div className="resource">
                <span className="resource-label">Credits</span>
                <span className="resource-value">{credits}</span>
              </div>
              <div className="resource">
                <span className="resource-label">XP</span>
                <span className="resource-value">{xp}</span>
              </div>
            </div>

            <div className="ability-scores">
              <h3 className="section-title">Ability Scores</h3>
              {abilityScores.map((abilityScore) => (
                <div key={abilityScore.ability} className="ability-score-item">
                  <span 
                    className="ability-name"
                    id={`ability-${abilityScore.ability}`}
                    onMouseEnter={() => toggleTooltip(abilityScore.ability)}
                    onMouseLeave={() => toggleTooltip(abilityScore.ability)}
                  >
                    {abilityScore.ability}
                  </span>
                  <span className="ability-value">+{abilityScore.score}</span>
                  <Tooltip
                    placement="right"
                    isOpen={tooltipOpen[abilityScore.ability]}
                    target={`ability-${abilityScore.ability}`}
                    toggle={() => toggleTooltip(abilityScore.ability)}
                  >
                    {getAbilityBasicSkill(abilityScore.ability)}
                  </Tooltip>
                </div>
              ))}
            </div>

            <div className="advanced-skills">
              <h3 
                className="section-title collapsible" 
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
              >
                Advanced Skills
                <span className={`collapse-icon ${isSkillsOpen ? 'open' : ''}`}>▼</span>
              </h3>
              {isSkillsOpen && (
                <div className="skills-list">
                  {getAdvancedSkills().map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-description">{skill.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="character-ship">
              <h3 className="section-title">Ship</h3>
              <div className="ship-name">{ship.name}</div>
              <div className="ship-stats">
                <div className="ship-stat">
                  <span className="stat-label">Hull</span>
                  <span className="stat-value">{ship.hull}</span>
                </div>
                <div className="ship-stat">
                  <span className="stat-label">Shields</span>
                  <span className="stat-value">{ship.shields}</span>
                </div>
                <div className="ship-stat">
                  <span className="stat-label">Speed</span>
                  <span className="stat-value">{ship.speed}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
  );
} 