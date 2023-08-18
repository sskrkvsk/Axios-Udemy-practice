import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    
    const objCheck = Object.keys(req.body).length;
    
    res.render("index.ejs", { data: result, objCheck:objCheck });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    }); 
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/filter");
    const result = response.data;
    const type = req.body.type
    const participants = req.body.participants
    console.log(response.status);

function theMachine() {
  const error = "No activities that match your criteria.";
  if (type && type !== "") {
    if (participants && participants !== "") {
      const typeCards = result.filter(card => card.type === type);
      const typePartCards = typeCards.filter(part => part.participants == participants);
      const randCard = typePartCards[Math.floor(Math.random()*typePartCards.length)];

      if (randCard !== undefined) {
        return randCard
      } else { return error }
      
    } else { 
      const typeCards = result.filter(card => card.type === type);
      const randTypeCard = typeCards[Math.floor(Math.random()*typeCards.length)];

      if (randTypeCard !== undefined) {
        return randTypeCard
      } else { return error }
      
      
    }
  } else if (participants && participants !== "") {
    const participantsCards = result.filter(card => card.participants == participants);
    const randPartCard = participantsCards[Math.floor(Math.random()*participantsCards.length)];


    if (randPartCard !== undefined) {
      return randPartCard
    } else { return error }
  } else {
    return error
  }

}

    res.render("index.ejs", { data: result, theMachine: theMachine,});
  
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
