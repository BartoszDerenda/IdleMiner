// App
import './App.css';
import { useState, useEffect } from 'react';
import Shop from './components/Shop/Shop';
import Mines from './components/Mines/Mines';
import HeatMeter from './components/Mines/HeatMeter';
import Stats from './components/Stats/Stats';

function App() {
  const [currency, setCurrency] = useState(100000000);
  const [shopToggle, setShopToggle] = useState(false);

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
  })

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
      const miningIntervalId = setInterval(() => {
        for (let i = 0; i < worker.level; i++) {
          handleMining();
        }
      }, 1000 / worker.speed);

      return () => clearInterval(miningIntervalId);
    }
  });


  /* Drill mining */
  /* onScroll version */
  const handleDrill = () => {
    if (drill.isBought && !drill.cooldown) {
      setDrill(prevDrill => ({ ...prevDrill, heat: prevDrill.heat + 1 }));
      handleMining();
    }
  };


  /* Drill heat management */
  useEffect(() => {
    if (drill.heat > 0 && drill.heat < drill.heat_cap) {
      const heatintervalId = setInterval(() => {
        setDrill(prevDrill => ({
          ...prevDrill,
          heat: Math.max(0, prevDrill.heat - 1)
        }));
      }, 250 / drill.coolant);
      return () => clearInterval(heatintervalId);
      
    } else {
      // if drill overheats, set it on a cooldown
      if (drill.heat >= drill.heat_cap) {
        setDrill(prevDrill => ({
          ...prevDrill,
          cooldown: true,
          heat: prevDrill.heat - 1 // prevents an infinite loop
        }));
      };
    }

    // once heat reaches 0 and drill is on cooldown, set cooldown to false
    if (drill.heat === 0 && drill.cooldown) {
      setDrill(prevDrill => ({
        ...prevDrill,
        cooldown: false
      }));
    }

  }, [drill]);


  /* Upgrades */
  function handleUpgrade(cost, token) {
    if (currency >= cost) {
      setCurrency(currency - cost);

      if (token === 'power') {
        setPickaxe({ ...pickaxe, 
          power: pickaxe.power + 1, 
          power_cost: Math.round(pickaxe.power_cost * 1.15) 
        });
      }

      if (token === 'multistrike') {
        setPickaxe({ ...pickaxe, 
          multistrike: pickaxe.multistrike + 1, 
          multi_cost: Math.round(pickaxe.multi_cost * 1.15) 
        });
      }

      if (token === 'drill') {
        setDrill({...drill, 
          isBought: true
        });
      }

      if (token === 'coolant') {
        setDrill({...drill, 
          coolant: drill.coolant + 0.25,
          coolant_cost: Math.round(drill.coolant_cost * 1.15)
        });
      }

      if (token === 'heat_cap') {
        setDrill({...drill, 
          heat_cap: drill.heat_cap + 10,
          heat_cap_cost: Math.round(drill.heat_cap_cost * 1.15)
        });
      }
      
      if (token === 'worker') {
        setWorker({ ...worker, 
          level: worker.level + 1, 
          level_cost: Math.round(worker.level_cost * 1.15) 
        });
      }

      if (token === 'speed') {
        setWorker({ ...worker, 
          speed: worker.speed + 0.1, 
          speed_cost: Math.round(worker.speed_cost * 1.15) 
        });
      }

      if (token === 'quality') {
        setOre({ ...ore, 
          quality: ore.quality * 1.175,
          quality_cost: Math.round(ore.quality_cost * 1.15), 
          hardness: ore.hardness * 1.15, 
          progress: 0 
        });
      }

      if (token === 'gems') {
        setOre({ ...ore, 
          gem_chance: ore.gem_chance + 0.25,
          gem_cost: Math.round(ore.gem_cost * 1.15), 
        });
      }

    }
  }

  /* Turns on and off the ability to buy stuff using your mouse scroll */
  function handleShopToggle() {
    setShopToggle(!shopToggle);
  }

  /* Mining */
  function handleMining() {
    setOre(prevOre => ({ ...prevOre, progress: prevOre.progress + (pickaxe.power * pickaxe.multistrike) }));
    if (Math.floor(Math.random() * 100) <= ore.gem_chance) {
      setCurrency(currency + ore.quality / 2);
    }
    if (ore.progress >= ore.hardness) {
      for (let i = 0; i < ore.progress; i = i + ore.hardness) {
        setCurrency(currency + ore.quality);
      }
      setOre(prevOre => ({ ...prevOre, progress: prevOre.progress - ore.hardness }));
    }
  }

  /* Checks if you have finished mining the ore */
  useEffect(() => {
    if (ore.progress >= ore.hardness) {
      setCurrency(currency + ore.quality);
      setOre({...ore, progress: ore.progress - ore.hardness})
    }
  }, [currency, ore]
  );

  return (
    <div className='main-box'>

      <div className='shop-box'>
        <h2>SHOP</h2>
        <Shop handleUpgrade={handleUpgrade} handleShopToggle={handleShopToggle} shopToggle={shopToggle} pickaxe={pickaxe} drill={drill} worker={worker} ore={ore} />
      </div>

      <div className='mine-box'>
        <div className='mine'>
          <h2>MINE</h2>
          <Mines handleMining={handleMining} handleDrill={handleDrill} ore={ore} currency={currency} drill={drill} />
        </div>
        {drill.isBought && (
        <div className='heat-meter'>
          <HeatMeter drill={drill} />
        </div>
        )}
      </div>

      <div className='stats-box'>
        <h2>STATS</h2>
        <Stats pickaxe={pickaxe} drill={drill} worker={worker} ore={ore}/>
      </div>
      
    </div>
  );
}

export default App;
