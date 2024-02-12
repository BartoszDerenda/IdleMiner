import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [currency, setCurrency] = useState(10000000);

  const [pickaxe, setPickaxe] = useState({ 
    power: 1, power_cost: 10,
    multistrike: 1, multi_cost: 250,
  });

  const [worker, setWorker] = useState({ 
    level: 0, level_cost: 35, 
    speed: 1, speed_cost: 15,
  });

  const [ore, setOre] = useState({ 
    quality: 1, quality_cost: 10,
    gem_chance: 100, gem_cost: 25,
    hardness: 3, progress: 0,
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
      setCurrency(Math.round(currency + ore.quality));
    }

    if (ore.progress >= ore.hardness) {
      for (let i = 0; i < ore.progress; i = i + ore.hardness) {
        setCurrency(Math.round(currency + ore.quality));
      }
  
      // Use the functional form of setOre to ensure you are working with the most recent state
      setOre(prevOre => ({ ...prevOre, progress: prevOre.progress - ore.hardness }));
    }
  }

  return (
    <div className='main-board'>

      <div className='shop'>
        <h2>SHOP</h2>

        <div className='upgrade-tab'>
          <h3>Pickaxe</h3>
          <div className='upgrade'>
            <button onClick={() => handleUpgrade(pickaxe.power_cost, 'power')}>Power +1</button>
            <span>Cost: {pickaxe.power_cost}</span>
          </div>
          <div className='upgrade'>
            <button onClick={() => handleUpgrade(pickaxe.multi_cost, 'multistrike')}>Multistrike +1</button>
            <span>Cost: {pickaxe.multi_cost}</span>
          </div>
        </div>

        <div className='upgrade-tab'>
          <h3>Workers</h3>
          <div className='upgrade'>
            <button onClick={() => handleUpgrade(worker.level_cost, 'worker')}>Worker +1</button>
            <span>Cost: {worker.level_cost}</span>
          </div>
          <div className='upgrade'>
            <button onClick={() => handleUpgrade(worker.speed_cost, 'speed')} disabled={worker.speed >= 99.99}>Speed +10%</button>
            <span>Cost: {(worker.speed <= 99.99) ? worker.level_cost : 'MAXED'}</span>
          </div>
        </div>

        <div className='upgrade-tab'>
          <h3>Ore</h3>
          <div className='upgrade'>
            <button onClick={() => handleUpgrade(ore.quality_cost, 'quality')}>Ore quality +1</button>
            <span>Cost: {ore.quality_cost}</span>
          </div>
          <div className='upgrade'>
            <button onClick={() => handleUpgrade(ore.gem_cost, 'gems')}>Gem chance +0.25%</button>
            <span>Cost: {ore.gem_cost}</span>
          </div>
        </div>

      </div>

      <div className='mines'>
        <h2>Mines</h2>
        <progress value={ore.progress} max={ore.hardness}></progress>
        <button onClick={() => handleMining()}>Mine ore</button>
        <span>Currency: {currency}</span>
      </div>

      <div className='stats'>
        <h2>STATS</h2>

        <div className='stats-chunk'>
          <h3>Pickaxe</h3>
          <div className='stats-row'>
            <span>Power:</span><span>{pickaxe.power}</span>
          </div>
          <div className='stats-row'>
            <span>Multistrike:</span><span>{pickaxe.multistrike}x</span>
          </div>
          <div className='stats-row'>
            <span>Swing strength:</span><span>{pickaxe.power * pickaxe.multistrike}</span>
          </div>
        </div>

        <div className='stats-chunk'>
          <h3>Workers</h3>
          <div className='stats-row'>
            <span>Workers:</span><span>{worker.level}</span>
          </div>
          <div className='stats-row'>
            <span>Speed:</span><span>{Math.round(worker.speed * 100)}%</span>
          </div>
        </div>

        <div className='stats-chunk'>
          <h3>Ore</h3>
          <div className='stats-row'>
            <span>Ore hardness:</span><span>{Math.round(ore.hardness)}</span>
          </div>
          <div className='stats-row'>
            <span>Quality:</span><span>{Math.round(ore.quality)}</span>
          </div>
          <div className='stats-row'>
            <span>Gem chance:</span><span>{ore.gem_chance.toFixed(2)}</span>
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default App;
