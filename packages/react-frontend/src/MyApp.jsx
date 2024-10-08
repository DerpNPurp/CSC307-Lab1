// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

// const characters = [
//     {
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ];

// const [characters, setCharacters] = useState([]);

  function MyApp() {

    function updateList(person) {
        setCharacters([...characters, person]);
      }

    


    const [characters, setCharacters] = useState([
      {
        name: "Charlie",
        job: "Janitor" // the rest of the data
      }
    ]);
  
    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
    }

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />

          <Form handleSubmit={updateList} />
        </div>
        
      );

  }

export default MyApp;