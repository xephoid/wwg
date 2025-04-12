import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'reactstrap';

export default function HabitatIntro(props) {
  const {messages, setMessages, playerInfo, setPlayerInfo, gameState, currentHabitat} = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
    fetch('http://localhost:4000', { 
      method: "POST", 
      cache: 'no-cache', 
      body: JSON.stringify({ ...playerInfo, gameState: gameState, habitatName: currentHabitat.name, habitatDescription: currentHabitat.description }), 
      mode: 'cors'
    })
      .then(res => {
        if (res.status != 200) {
          // analytics.track('Status error', { status: res.status });
          // jsTypeText.stop();
          // setMsg("Oops! Something went wrong. Try refreshing the page.");
          console.log('error status!', res.status);
        } else {
          setLoading(false); 
        }
      return res.json();
    })
    .then((json) => {
      const newPlayeInfo = { ...playerInfo };
      newPlayeInfo.threadId = json.threadId;
      setPlayerInfo(newPlayeInfo);
      const newMessages = [...messages, { text: json.description, type: 'assistant' }];
      setMessages(newMessages);
    })
    .catch((error) => {
      // analytics.track('Caught error', error);
      // jsTypeText.stop();
      // setMsg("Oops! Something went wrong. Try refreshing.");
      console.log(error);
    });
  }
  });

  return  loading ? <div>Loading...</div> : <>
  <Button onClick={() => { setGameState('HABITAT_RECRUIT'); }}>Look for Recruits</Button>
  <Button onClick={() => { setGameState('HABITAT_MISSIONS'); }}>Check Mission Boards</Button>
  <Button onClick={() => { setGameState('HABITAT_SHOP');}}>Shop for items</Button>
  <Button onClick={() => { setGameState('HABITAT_RNR');}}>Get some R and R for the crew</Button>
  </>
}