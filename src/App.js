import './App.css';
import { useState, useEffect } from 'react';
import Mines from './components/Mines/Mines';
import PickaxeUpgrade from './components/Shop/upgrades/PickaxeUpgrade';
import WorkerUpgrade from './components/Shop/upgrades/WorkerUpgrade';
import OreUpgrade from './components/Shop/upgrades/OreUpgrade';
import Stats from './components/Stats/Stats';

function App() {
  const [currency, setCurrency] = useState(100000000);

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

  /* Worker */
  /* Auto-mining */
  useEffect(() => {
    if (worker.level > 0) {
      const intervalId = setInterval(() => {
        for (let i = 0; i < worker.level; i++) {
          handleMining();
        }
      }, 1000 / worker.speed);

      return () => clearInterval(intervalId);
    }
  });

  /* Upgrades */
  function handleUpgrade(cost, token) {
    if (currency >= cost) {
      setCurrency(currency - cost);

      if (token === 'power') {
        setPickaxe({ ...pickaxe, 
          power: pickaxe.power + 1, 
          power_cost: Math.round(pickaxe.power_cost * 1.1) 
        });
      }

      if (token === 'multistrike') {
        setPickaxe({ ...pickaxe, 
          multistrike: pickaxe.multistrike + 1, 
          multi_cost: Math.round(pickaxe.multi_cost * 1.1) 
        });
      }
      
      if (token === 'worker') {
        setWorker({ ...worker, 
          level: worker.level + 1, 
          level_cost: Math.round(worker.level_cost * 1.1) 
        });
      }

      if (token === 'speed') {
        setWorker({ ...worker, 
          speed: worker.speed + 0.1, 
          speed_cost: Math.round(worker.speed_cost * 1.1) 
        });
      }

      if (token === 'quality') {
        setOre({ ...ore, 
          quality: ore.quality + 1,
          quality_cost: Math.round(ore.quality_cost * 1.1), 
          hardness: ore.hardness * 1.1, 
          progress: 0 
        });
      }

      if (token === 'gems') {
        setOre({ ...ore, 
          gem_chance: ore.gem_chance + 0.25,
          gem_cost: Math.round(ore.gem_cost * 1.1), 
        });
      }

    }
  }

  /* Mining */
  function handleMining() {
    setOre(prevOre => ({ ...prevOre, progress: prevOre.progress + pickaxe.power }));
    if (Math.floor(Math.random() * 100) <= ore.gem_chance) {
      setCurrency(currency + ore.quality / 2);
    }

    if (ore.progress >= ore.hardness) {
      for (let i = 0; i < ore.progress; i = i + ore.hardness) {
        setCurrency(currency + ore.quality);
      }

      // Use the functional form of setOre to ensure you are working with the most recent state
      setOre(prevOre => ({ ...prevOre, progress: prevOre.progress - ore.hardness }));
    }
  }

  useEffect(() => {
    if (ore.progress >= ore.hardness) {
      setCurrency(currency + ore.quality);
      setOre({...ore, progress: ore.progress - ore.hardness})
    }
  }, [currency, ore]
  );

  return (
    <div className='main-board'>

      <div className='shop'>
        <h2>SHOP</h2>
        <PickaxeUpgrade handleUpgrade={handleUpgrade} pickaxe={pickaxe} />
        <WorkerUpgrade handleUpgrade={handleUpgrade} worker={worker} />
        <OreUpgrade handleUpgrade={handleUpgrade} ore={ore} />
      </div>

      <div className='mine'>
        <h2>MINE</h2>
        <Mines handleMining={handleMining} ore={ore} currency={currency} />
      </div>

      <div className='stats'>
        <h2>STATS</h2>
        <Stats pickaxe={pickaxe} worker={worker} ore={ore}/>
      </div>
      
    </div>
  );
}

export default App;
