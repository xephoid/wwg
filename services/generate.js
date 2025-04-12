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
  res.set('Access-Control-Allow-Methods', 'GET OPTIONS POST');
  res.set('Access-Control-Max-Age', '3600');
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const openai = new OpenAI();
  let body = req.body;
  try {
    body = JSON.parse(req.body);
  } catch (error) {
    console.log(req.body);
    console.log(error);
  }

  const initial = `The user has chosen their character name to be ${body.name}. They are a ${body.race}. Their ability scores are ${body.abilityScores[0].ability} +3 ${body.abilityScores[1].ability} +2 and ${body.abilityScores[2].ability} +1. Their ship's name is ${body.ship.name}. Their location is ${body.habitatName} which is ${body.habitatDescription}. Please remember to only respond with JSON and nothing else.`;

  const generateResponse = async (prompt) => {
    console.log('Creating completion request...');
    const completion = await openai.responses.create.create({
      model: "o3-mini",
      input: [
        {
          role: "developer",
          content: [
            {
              type: "input_text",
              text: "Take a deep breath.\n\nYou are an API assisting the game master of Warble Way Galaxy, a solo RPG. You will be filling in story with lore accurate descriptions of situations. You will also help come up with Missions, Hazards, Crew and other things the User will encounter.\n\nDuring the game,  describe the current location and situation in detail. Stick to the rules as closely as possible. Referencing the document provided.\n\nYou do not reference races that do not exist outside of the instructions.\n\nYou always respond with JSON that can be parsed as is and nothing else. Do not explain you reasoning."
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: initial
            }
          ]
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt
            }
          ]
        }
      ],
      response_format: { type: "json_object" },
      reasoning: { "effort": "medium" },
      tools: [
        {
          "type": "function",
          "name": "HABITAT_INTRO",
          "description": "The Habitat Arrival function should return JSON that describes the arrival of the player to a location.",
          "parameters": {
            "type": "object",
            "required": [
              "description",
              "beings"
            ],
            "properties": {
              "description": {
                "type": "string",
                "description": "Description of arrival"
              },
              "beings": {
                "type": "array",
                "description": "List of beings arriving",
                "items": {
                  "type": "object",
                  "required": [
                    "name",
                    "race",
                    "abilityScores",
                    "description"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "A scifi sounding name or a name from the rulebook"
                    },
                    "race": {
                      "type": "string",
                      "description": "Race of the being"
                    },
                    "abilityScores": {
                      "type": "array",
                      "description": "List of ability scores for the being",
                      "items": {
                        "type": "object",
                        "required": [
                          "ability",
                          "score"
                        ],
                        "properties": {
                          "ability": {
                            "type": "string",
                            "description": "The ability code"
                          },
                          "score": {
                            "type": "number",
                            "description": "The score of the ability"
                          }
                        },
                        "additionalProperties": false
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "A short physical description"
                    }
                  },
                  "additionalProperties": false
                }
              }
            },
            "additionalProperties": false
          },
          "strict": true
        },
        {
          "type": "function",
          "name": "HABITAT_RECRUIT",
          "description": "Provide descriptions of beings the player can recruit from a habitat",
          "parameters": {
            "type": "object",
            "required": [
              "location",
              "beings"
            ],
            "properties": {
              "location": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Type of the location, e.g., 'recruiting office', 'cantina'"
                  },
                  "description": {
                    "type": "string",
                    "description": "Detailed description of the location"
                  }
                },
                "required": [
                  "type",
                  "description"
                ],
                "additionalProperties": false
              },
              "beings": {
                "type": "array",
                "description": "List of beings available for recruitment",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "The name of the being should match their race"
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the being, including appearance and skills"
                    }
                  },
                  "required": [
                    "name",
                    "description"
                  ],
                  "additionalProperties": false
                }
              }
            },
            "additionalProperties": false
          },
          "strict": true
        },
        {
          "type": "file_search",
          "vector_store_ids": [
            "vs_67f83bfd31208191840194e13224cadb"
          ]
        }
      ]
    });

    console.log('Response received');
    const json = JSON.parse(completion.choices[0].message.content);
    return json;
  }

  let json = {};

  //const preface = `The user who's character name is ${body.name} has chosen to ${body.gameState} at ${body.habitatName} which is ${body.habitatDescription}. `;

  switch (body.gameState) {
    case 'HABITAT_RECRUIT':
      json = await generateResponse(`Generate a description of their transition to the recruiting location. Also generate names and descriptions of crewmates based on the following stats ${body.recruitPool.reduce((acc, recruit) => `${acc} ${recruit.race} ${recruit.abilityScores.reduce((acc, ability) => `${acc} ${ability.ability} +${ability.score}`, "")}\n`, "")}`);
      break;
    case 'HABITAT_MISSIONS':
      json = await generateResponse(`The player has chosen to look for a mission. Generate a description of them arriving at a place where job postings might be found. Additionally generate 5 missions the player can choose from. The mission titles and descriptions should match the ability required. Your response should be in the following format: { "description": "Description of arrival", "missions": [ { "title": "A Mission title", "description": "More details on the mission requirements", "distance": 3, "ability": "RES", "credits": 300, "xp": 1 }, { "title": "A Mission title", "description": "More details on the mission requirements", "distance": 3, "ability": "SWA", "credits": 300, "xp": 1 }, { "title": "A Mission title", "description": "More details on the mission requirements", "distance": 3, "ability": "HAK", "credits": 300, "xp": 1 } ] } Abilities and races should always come from the rulebook.`);
      break;
    case 'HABITAT_SHOP':
      const prompt = `The player has decided they want to shop for items. Generate a description of them arriving at a shopping area. Additional generate a list of items available for purchase. Items should have stats and descriptions like from the rulebook. You should respond with JSON in the following format: { "description": "Description of arrival", "items": [ { "name": "Scifi name relating to what is does", "type": "Consumable", "effect": { "ability": "Any", "score": 3 }, "cost": 200 }, { "name": "Scifi name relating to what is does", "type": "Weapon", "effect": { "ability": "GUN", "score": 3 }, "cost": 300 }, { "name": "Scifi name relating to what is does", "type": "Ship part", "effect": { "ability": "Speed", "score": "1" }, "cost": 300 } ] }`;
      json = await generateResponse(prompt);
      break;
    case 'HABITAT_INTRO':
    default:
      json = await generateResponse(`Generate an exciting intro as their character arrives.`);
      break;
  }

  res.send(json);
}