// components/Shop/Shop.jsx
import './Shop.css';
import { useState } from 'react';
import PickaxeUpgrade from './upgrades/PickaxeUpgrade';
import WorkerUpgrade from './upgrades/WorkerUpgrade';
import OreUpgrade from './upgrades/OreUpgrade';
import ShopToggle from './buttons/ShopToggle';

function Shop({ pickaxe, setPickaxe, drill, setDrill, worker, setWorker, ore, setOre, currency, setCurrency }) {

  const [shopToggle, setShopToggle] = useState(false);

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

  return (
    <>
    <PickaxeUpgrade handleUpgrade={handleUpgrade} shopToggle={shopToggle} pickaxe={pickaxe} drill={drill} />
    <WorkerUpgrade handleUpgrade={handleUpgrade} shopToggle={shopToggle} worker={worker} />
    <OreUpgrade handleUpgrade={handleUpgrade} shopToggle={shopToggle} ore={ore} />
    <ShopToggle handleShopToggle={handleShopToggle} />
    </>
  );
}

export default Shop;
