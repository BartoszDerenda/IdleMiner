// components/Stats/Stats.jsx
import './Stats.css';

function Stats({pickaxe, worker, ore}) {
  return (
    <>
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
    </>
  );
}

export default Stats;
