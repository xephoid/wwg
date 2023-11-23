
const { OpenAI } = require("openai");

let TESTING = false;
if (!process.env.NODE_ENV) {
  console.log("Loading .env");
  require("dotenv").config();
  TESTING = true;
} else {
  console.log("Environment is production");
}

exports.generate = async (req, res) => {
  res.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'GET OPTIONS POST' );
  res.set('Access-Control-Max-Age', '3600');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.status(204).send('');
    return;
  }
  
  const openai = new OpenAI();
  let body = req.body;//{};
  try {
    body = JSON.parse(req.body);
  } catch (error) {
    console.log(req.body);
    console.log(error);
  }

  if (!body.threadId) {
    console.log('No thread ID so generating one...')
    const thread = await openai.beta.threads.create();
    console.log('done');
    body.threadId = thread.id;
    console.log('Creating first message...');
    await openai.beta.threads.messages.create(
      body.threadId,
      {
        role: "user",
        content: `The user has chosen their character name to be ${body.name}. They are a ${body.race}. Their ability scores are ${body.abilityScores[0].ability} +3 ${body.abilityScores[1].ability} +2 and ${body.abilityScores[2].ability} +1. Their ship's name is ${body.ship.name}. They are ready to begin their adventure. Please remember to only respond with JSON and nothing else.`
      }
    );
    console.log('done');
  }

  const runAndWait = async (prompt) => {
    console.log('Creating run request...');
      const run = await openai.beta.threads.runs.create(
        body.threadId,
        { 
          assistant_id: process.env.OPEN_AI_ASSISTANT_ID,
          instructions: prompt,
          tools: [{"type": "code_interpreter"}, {"type": "retrieval"}]
        }
      );
      console.log('done');
      let runComplete = false;
      do {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Checking run request...')
        const runCheck = await openai.beta.threads.runs.retrieve(
          body.threadId,
          run.id
        );
        console.log('done. status = ', runCheck.status);
        runComplete = runCheck.status == 'completed';
      } while (!runComplete);
      
      console.log('Pulling message...');
      const messages = await openai.beta.threads.messages.list(
        body.threadId
      );

      console.log(JSON.parse(messages.data[0].content[0].text.value.replace('```json', '').replace('```', '')));
      const json = JSON.parse(messages.data[0].content[0].text.value.replace('```json', '').replace('```', ''));
      json.threadId = body.threadId;
      return json;
  }

  let json = {};

  switch (body.gameState) {
    case 'HABITAT_RECRUIT':
      json = await runAndWait(`The user has chosen to look for new recruits. Generate a description of their transition to the cantina. Also, generate a list of 4 potential crewmates. Your response should be in JSON using the following format: { "description": "Description of arrival", "beings": [ { "name": "Sci-fi sounding name", "race": "Human", "abilityScores": [{ "ability": "SWA", "score": "1"} ], "description": "A short physical description" }, { "name": "Name from the rulebook", "race": "Hexapod", "abilityScores": [ { "ability": "RES", "score": 1 } ], "description": "A short physical description" }, { "name": "Boon of Pyrite", "race": "Grull", "abilityScores": [{ "ability": "SNE", "score": "1"} ], "description": "A short physical description" }, { "name": "Gronk", "race": "Kralkin", "abilityScores": [ { "ability": "DIP", "score": 1 } ], "description": "A short physical description" } ]} Only use races and stats provided in the rulebook.`);
      break;
    case 'HABITAT_MISSIONS':
      json = await runAndWait(`The player has chosen to look for a mission. Generate a description of them arriving at a place where job postings might be found. Additionally generate 5 missions the player can choose from. The mission titles and descriptions should match the ability required. Your response should be in the following format: { "description": "Description of arrival", "missions": [ { "title": "A Mission title", "description": "More details on the mission requirements", "distance": 3, "ability": "RES", "credits": 300, "xp": 1 }, { "title": "A Mission title", "description": "More details on the mission requirements", "distance": 3, "ability": "SWA", "credits": 300, "xp": 1 }, { "title": "A Mission title", "description": "More details on the mission requirements", "distance": 3, "ability": "HAK", "credits": 300, "xp": 1 } ] } Abilities and races should always come from the rulebook.`);
      break;
    case 'HABITAT_SHOP':
      const prompt = `The player has decided they want to shop for items. Generate a description of them arriving at a shopping area. Additional generate a list of items available for purchase. Items should have stats and descriptions like from the rulebook. You should respond with JSON in the following format: { "description": "Description of arrival", "items": [ { "name": "Scifi name relating to what is does", "type": "Consumable", "effect": { "ability": "Any", "score": 3 }, "cost": 200 }, { "name": "Scifi name relating to what is does", "type": "Weapon", "effect": { "ability": "GUN", "score": 3 }, "cost": 300 }, { "name": "Scifi name relating to what is does", "type": "Ship part", "effect": { "ability": "Speed", "score": "1" }, "cost": 300 } ] }`;
      json = await runAndWait(prompt);
      break;
    case 'HABITAT_INTRO':
    default:
      json = await runAndWait(`Generate an exciting intro as their character arrives at ${body.habitatName} which is ${body.habitatDescription}. The result should be in JSON with the following format: { "title": "Fun name of the adventure based on the player's stats", "description": "An exciting intro"} with nothing else.`);
      
      break;
  }

  res.send(json);
}