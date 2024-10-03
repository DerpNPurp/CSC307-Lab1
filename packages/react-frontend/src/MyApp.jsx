// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
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




    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );


    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }


    function updateList(person) { 
      postUser(person)
        .then((res) => {
          if(res.status == 201){
            return res.json();
          }else {
            throw new Error("Failed to create user");
          }
          
        })
        .then((newPerson) => setCharacters([...characters, newPerson]))
        .catch((error) => {
          console.log(error);
        })
  }
    
    


    const [characters, setCharacters] = useState([
      {
        name: "Charlie",
        job: "Janitor" // the rest of the data
      }
    ]);
  
    function removeOneCharacter(index) {
      const userId = characters[index].id;  // Get the ID of the user to delete
    
      fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.status === 204) {
            
            const updated = characters.filter((character, i) => i !== index);
            setCharacters(updated);
          } else {
            throw new Error('Failed to delete user');
          }
        })
        .catch((error) => {
          console.log(error);
        });
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