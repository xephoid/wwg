import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'reactstrap';

export default function HabitatIntro(props) {
  const {messages, setMessages, playerInfo, setPlayerInfo, gameState} = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
    fetch('http://localhost:4000', { 
      method: "POST", 
      cache: 'no-cache', 
      body: JSON.stringify({ ...playerInfo, gameState: 'HABITAT_INTRO', habitatName: 'Xaxalon 4', habitatDescription: 'A small outpost on the outskirts of the galaxy'}), 
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
  <Button>Look for Recruits</Button>
  <Button>Check Mission Boards</Button>
  <Button>Show for items</Button>
  <Button>Get some R and R for the crew</Button>
  </>
}