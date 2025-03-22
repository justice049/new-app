import React, { useEffect } from 'react';
import Child from './Child';
import './App.css';
import axios from 'axios';
function App() {
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res.data);
      })
  })
    return (
      <div>
        app
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
          <Child /> 
        </div>
    )
}

export default App;