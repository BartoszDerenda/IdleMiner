// components/Mines/Mines.jsx
import './Mines.css';
import currencyIcon from '@/gold.png';

function Mine({handleMining, handleDrill, ore, currency, drill}) {
  return (
    <>
    <progress value={ore.progress} max={ore.hardness}></progress>
    <button className={drill.isBought ? ('drill') : ('pickaxe')} onClick={() => handleMining()} onWheel={() => handleDrill()}>Mine ore</button>
    <span>Total balance:</span>
    <span className='currency-align'>{Math.round(currency)}<img src={currencyIcon} alt='currency' /></span>
    </>
  );
}

export default Mine;
