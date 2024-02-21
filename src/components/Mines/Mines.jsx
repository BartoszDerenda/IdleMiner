// components/Mines/Mines.jsx
import './Mines.css';
import { useEffect, useCallback } from 'react';
import currencyIcon from '../../gold.png';

function Mine({ pickaxe, drill, setDrill, worker, ore, setOre, currency, setCurrency }) {

  /* Mining */
  const handleMining = useCallback((token) => {
    // Accumulated changes
    let newOreProgress = ore.progress;
    let newCurrency = currency;
  
    switch (token) {
      
      case 'worker':
        // Checks for gem chance
        for (let i=0; i<worker.level; i++) {  // checks separately for each worker's swing - this loop can be quite demanding in the late game, beware.
          if (Math.floor(Math.random() * 100) < ore.gem_chance) {
            newCurrency += ore.quality / 4;
          }
        }
        newOreProgress += pickaxe.power * pickaxe.multistrike * worker.level; // notice the extra worker.level
        break;
  
      default: // aka player
        // Checks for gem chance
        if (Math.floor(Math.random() * 100) <= ore.gem_chance) {
          newCurrency += ore.quality / 4; // gems award 1/4th of ore's total value
        }
        newOreProgress += pickaxe.power * pickaxe.multistrike;
        break;
    }


    // Check if ore progress exceeds hardness
    if (newOreProgress >= ore.hardness) {
      const oreMined = Math.floor(newOreProgress / ore.hardness); // Calculate the number of ores mined
      newCurrency += oreMined * ore.quality; // Update currency based on the number of ores mined
      newOreProgress %= ore.hardness; // Update ore progress
      console.log(newCurrency - currency);
    }
  
    // Update state with accumulated changes
    setOre(prevOre => ({ ...prevOre, progress: newOreProgress }));
    setCurrency(newCurrency);
  
  }, [pickaxe, ore, setOre, currency, setCurrency, worker.level]);


  /* Worker */
  /* Auto-mining */
  useEffect(() => {
    if (worker.level > 0) {
      const miningIntervalId = setInterval(() => {
        handleMining('worker');
      }, 1000 / worker.speed);

      return () => clearInterval(miningIntervalId);
    }
  }, [worker, handleMining]);


  /* Drill mining */
  /* onScroll version */
  const handleDrill = () => {
    if (drill.isBought && !drill.cooldown) {
      setDrill(prevDrill => ({ ...prevDrill, heat: prevDrill.heat + 1 })); // each drill strike += 1 heat
      handleMining();
    }
  };


  /* Drill heat management */
  useEffect(() => {
    if (drill.heat > 0 && drill.heat < drill.heat_cap) {
      const heatintervalId = setInterval(() => {
        setDrill(prevDrill => ({
          ...prevDrill,
          heat: Math.max(0, prevDrill.heat - 1) // cooling process
        }));
      }, 250 / drill.coolant);
      return () => clearInterval(heatintervalId);
    } else {
      if (drill.heat >= drill.heat_cap) { // if drill overheats, set it on cooldown
        setDrill(prevDrill => ({
          ...prevDrill,
          cooldown: true,
          heat: prevDrill.heat - 1
        }));
      }
    }
  
    if (drill.heat === 0 && drill.cooldown) { // if drill is on cooldown but reaches 0 heat, turn it off cooldown
      setDrill(prevDrill => ({
        ...prevDrill,
        cooldown: false
      }));
    }
  }, [drill, setDrill]);


  /* Checks if you have finished mining the ore */
  useEffect(() => {
    if (ore.progress >= ore.hardness) {
      setCurrency(prevCurrency => prevCurrency + ore.quality);
      setOre(prevOre => ({ ...prevOre, progress: prevOre.progress - ore.hardness }));
    }
  }, [currency, setCurrency, ore, setOre]);


  return (
    <>
    <progress value={ore.progress} max={ore.hardness}></progress>
    <button className={drill.isBought ? ('drill') : ('pickaxe')} onClick={() => handleMining('player')} onWheel={() => handleDrill()}>Mine ore</button>
    <span>Total balance:</span>
    <span className='currency-align'>{Math.round(currency)}<img src={currencyIcon} alt='currency' /></span>
    </>
  );
}

export default Mine;
