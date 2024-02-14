// components/Mines/HeatMeter.jsx
import HeatPip from './HeatPip';
import './Mines.css';

function HeatMeter({drill}) {
  return (
    <div className='heat-meter-box'>
      <span>{drill.heat}</span>
      <HeatPip drill={drill} heatTreshold={1} />
      <HeatPip drill={drill} heatTreshold={20} />
      <HeatPip drill={drill} heatTreshold={40} />
      <HeatPip drill={drill} heatTreshold={60} />
      <HeatPip drill={drill} heatTreshold={80} />
      <span>{drill.heat_cap}</span>
    </div>
  );
}

export default HeatMeter;
