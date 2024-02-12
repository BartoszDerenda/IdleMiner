// components/Mines/Mines.jsx
import './Mines.css';

function Stats({handleMining, ore, currency}) {
  return (
    <>
    <progress value={ore.progress} max={ore.hardness}></progress>
    <button onClick={() => handleMining()}>Mine ore</button>
    <span>Currency: {currency}</span>
    </>
  );
}

export default Stats;
