import './App.css';
import {useState, useEffect } from "react";  
import Axios from 'axios';

function App() {
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [listOFFriends, setListOfFriends] = useState([]);

const addFriend = () => {
  Axios.post('http://localhost:3001/addfriend',{
    name: name, 
    age: age,
  }).then(()=>{
    setListOfFriends([...listOFFriends, {name: name, age: age}])
  })
};

const updateFriend = (id) => {
  const newAge = prompt('Enter New Age');
  Axios.put('http://localhost:3001/update',{newAge: newAge, id: id});
}

useEffect(() => {
  Axios.get('http://localhost:3001/read')
  .then((response) => {
    setListOfFriends(response.data)
  })
  .catch(()=> {
    console.log("ERROR");
  });
}, []);
  return (
    <div className="App">
      <div className="inputs">
      <input type="text" placeholder="Friend name..."  
      onChange={(event)=> {
        setName(event.target.value)
      }}
      />
      <input type="number" 
      placeholder="Friend age..."
      onChange={(event)=> {
        setAge(event.target.value)
      }}
      />

      <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className="listOfFriends">
      {listOFFriends.map((val) => {
        return (
          <div className="friendContainer">
            <div className="friend">
            <h3>Name: {val.name}</h3>
            <h3> Age: {val.age}</h3>
           </div>
           <button onClick={() => {updateFriend(val._id)}}>Update</button>
           <button id="removeBtn">X</button>
          </div>
      );
        })}
      </div>
    </div>
  );
}

export default App;
