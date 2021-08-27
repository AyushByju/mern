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
    alert("it worked");
  })
  .catch(()=> {
    alert("it didnt work");
  });
};
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

      {listOFFriends.map((val) => {
        return (
        <div>
          {" "}
          {val.name} {val.age}
           </div>
      );
        })}
    </div>
  );
}

export default App;
