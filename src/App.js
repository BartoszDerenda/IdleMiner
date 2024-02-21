// App.js
import './App.css';
import { useState } from 'react';
import Shop from './components/Shop/Shop';
import Mines from './components/Mines/Mines';
import HeatMeter from './components/Mines/HeatMeter';
import Stats from './components/Stats/Stats';
import StockMarket from './components/StockMarket/StockMarket';

function App() {
  const [currency, setCurrency] = useState(100000000);

  const [drill, setDrill] = useState({
    isBought: false,
    drill_cost: 10000,
    overcharge: false,
    heat: 0,
    cooldown: false,
    coolant: 1,
    coolant_cost: 750,
    heat_cap: 100,
    heat_cap_cost: 500, 
  });

  const [pickaxe, setPickaxe] = useState({
    power: 1,
    power_cost: 10,
    multistrike: 1,
    multi_cost: 250,
  });

  const [worker, setWorker] = useState({
    level: 0,
    level_cost: 35,
    speed: 1,
    speed_cost: 15,
  });

  const [ore, setOre] = useState({
    quality: 1,
    quality_cost: 10,
    gem_chance: 0,
    gem_cost: 25,
    hardness: 3,
    progress: 0,
  });

  return (
    <div className='main-box'>

      <div className='shop-mine-stats'>
        <div className='shop-box'>
          <h2>SHOP</h2>
          <Shop pickaxe={pickaxe} setPickaxe={setPickaxe}
                drill={drill} setDrill={setDrill}
                worker={worker} setWorker={setWorker}
                ore={ore} setOre={setOre}
                currency={currency} setCurrency={setCurrency} />
        </div>

        <div className='mine-box'>
          <div className='mine'>
            <h2>MINE</h2>
            <Mines pickaxe={pickaxe} 
                   drill={drill} setDrill={setDrill} 
                   worker={worker} 
                   ore={ore} setOre={setOre} 
                   currency={currency} setCurrency={setCurrency} />
          </div>
          {drill.isBought && (
          <div className='heat-meter'>
            <HeatMeter drill={drill} />
          </div>
          )}
        </div>

        <div className='stats-box'>
          <h2>STATS</h2>
          <Stats pickaxe={pickaxe}
                 drill={drill}
                 worker={worker}
                 ore={ore}/>
        </div>
      </div>

      <div className='stock-market'>
          <StockMarket currency={currency} setCurrency={setCurrency} />
      </div>
      
    </div>
  );
}

export default App;
