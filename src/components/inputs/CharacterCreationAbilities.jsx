import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { ABILITIES } from '../../lib/abilities';
import { STATS } from '../../lib/stats';
import '../../styles/CharacterCreationAbilities.css';

const CharacterCreationAbilities = ({ playerInfo, setPlayerInfo, setGameState, scoreAmount }) => {
  const [activeTab, setActiveTab] = useState('Brawn');
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAbilitySelect = (ability) => {
    if (!isSubmitted) {
      if (selectedAbility === ability.id) {
        setSelectedAbility(null);
      } else {
        setSelectedAbility(ability.id);
      }
    }
  };

  const getScoreDescription = (score) => {
    if (score >= 3) return '+3';
    if (score >= 2) return '+2';
    if (score >= 1) return '+1';
    return '0';
  };

  const getScoreQuestion = (score) => {
    if (score >= 3) return 'What is your character best at?';
    if (score >= 2) return 'What is your character good at?';
    if (score >= 1) return 'What is your character ok at?';
    return 'What is your character bad at?';
  };

  const handleSubmit = () => {
    if (selectedAbility && !isSubmitted) {
      setIsSubmitted(true);

      const ability = ABILITIES.find(a => a.id === selectedAbility);
      const updatedAbilityScore = {
        ability: selectedAbility,
        score: scoreAmount
      };

      const basicSkill = {
        name: ability.name,
        ability: selectedAbility,
        type: 'basic',
        description: ability.basicSkill,
        level: 1
      };

      const advancedSkill = {
        name: ability.name,
        ability: selectedAbility,
        type: 'advanced',
        description: ability.advancedSkill,
        level: 1
      };

      // Update player info with the new ability score and skills
      const updatedPlayerInfo = {
        ...playerInfo,
        abilityScores: [...(playerInfo.abilityScores || []), updatedAbilityScore],
        basicSkills: [...(playerInfo.basicSkills || []), basicSkill],
        advancedSkills: [...(playerInfo.advancedSkills || []), advancedSkill]
      };

      setPlayerInfo(updatedPlayerInfo);

      // Transition to next state after a short delay
      setTimeout(() => {
        if (scoreAmount === 3) {
          setGameState('CHARACTER_CREATION_STEP_SCORES_2');
        } else if (scoreAmount === 2) {
          setGameState('CHARACTER_CREATION_STEP_SCORES_1');
        } else if (scoreAmount === 1) {
          setGameState('CHARACTER_CREATION_STEP_SHIP_NAME');
        }
      }, 500);
    }
  };

  const groupedAbilities = Object.entries(STATS).reduce((acc, [stat, statData]) => {
    acc[stat] = ABILITIES.filter(ability => 
      statData.abilities.includes(ability.id) &&
      !playerInfo.abilityScores?.some(score => score.ability === ability.id)
    );
    return acc;
  }, {});

  return (
    <div className="character-creation-abilities">
      <h2>Select Your {getScoreDescription(scoreAmount)} Ability</h2>
      <p>{getScoreQuestion(scoreAmount)}</p>
      
      <Nav tabs className="stat-tabs">
        {Object.keys(STATS).map(stat => (
          <NavItem key={stat}>
            <NavLink
              className={classnames({ active: activeTab === stat })}
              onClick={() => setActiveTab(stat)}
            >
              {stat}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab} className="stat-tab-content">
        {Object.keys(STATS).map(stat => (
          <TabPane key={stat} tabId={stat}>
            <div className="ability-grid">
              {groupedAbilities[stat].map(ability => (
                <button
                  key={ability.id}
                  className={classnames('ability-button', {
                    'selected': selectedAbility === ability.id,
                    'used': playerInfo.abilityScores?.some(score => score.ability === ability.id)
                  })}
                  onClick={() => handleAbilitySelect(ability)}
                  disabled={playerInfo.abilityScores?.some(score => score.ability === ability.id)}
                >
                  <div className="ability-name">{ability.name}</div>
                  {selectedAbility === ability.id && (
                    <div className="ability-score">Bonus: {getScoreDescription(scoreAmount)}</div>
                  )}
                  <div className="skill-descriptions">
                      <div className="basic-skill-description">
                        <h4>{ability.basicSkill}</h4>
                        <p>{ability.basic}</p>
                      </div>
                      {scoreAmount === 3 && (
                        <div className="advanced-skill-description">
                          <h4>{ability.advancedSkill}</h4>
                          <p>{ability.advanced}</p>
                        </div>
                      )}
                    </div>

                  
                </button>
              ))}
            </div>
          </TabPane>
        ))}
      </TabContent>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!selectedAbility || isSubmitted}
      >
        {isSubmitted ? 'Ability Selected!' : 'Confirm Selection'}
      </button>
    </div>
  );
};

export default CharacterCreationAbilities;