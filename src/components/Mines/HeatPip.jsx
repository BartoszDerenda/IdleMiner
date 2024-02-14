// components/Mines/HeatMeter.jsx
import './Mines.css';

function HeatPip({drill, heatTreshold}) {
    const heatPercentage = (drill.heat / drill.heat_cap) * 100;
    const interval = 20 // 20% per interval
    const heat = ((drill.heat / drill.heat_cap) * 100) / 20
    let className = 'heat-pip';

    if (heatPercentage >= heatTreshold) {
        // for 1% - 20% case
        if (1 < heatPercentage < 20) {
            className = `heat-pip heat-1`;
        }
        // for 20% - 80% cases
        for (let i = 1; i <= heat; i++) {
            className = `heat-pip heat-${i * interval}`;
        }
      }

  return (
    <div className={className}></div>
  );
}

export default HeatPip;
