import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HelloWorld } from './components/HelloWorld';
import { TownListDisplayer } from './components/Town';
import { GeoLocation } from './components/GeoLocation';
import { EnhancedTownListDisplayer } from './components/EnhancedTownListDisplayer';

function App() {
  const [isHelloWorldVisible, setIsHelloWorldVisible] = React.useState(true);
  const [towns, setTowns] = React.useState([]);
  React.useEffect(() => {
    fetch('towns.json')
      .then(response => response.json())
      .then(data => {
        setTowns(data);
      });
  }, []);



  return (
    <div className="App">
      {isHelloWorldVisible && <HelloWorld name='Arno' onCounterChange={(clicks: number) => { if (clicks >= 10) setIsHelloWorldVisible(false); }} />}
      {/* <TownListDisplayer towns={towns} />
      <GeoLocation onModifiedCoordinates={() => console.log("Modifiées")} /> */}
      <EnhancedTownListDisplayer towns={towns} />
    </div>

  );
}

export default App;
