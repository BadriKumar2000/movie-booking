import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:3400/api")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      {users.map((eachUser) => (
        <>
          <li key={eachUser.id}>{eachUser.userName}</li>
          <p>{eachUser.id}</p>
        </>
      ))}
    </div>
  );
}

export default App;
