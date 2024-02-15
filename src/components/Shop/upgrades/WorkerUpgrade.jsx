// components/Shop/upgrades/WorkerUpgrade.jsx
import ShopButton from '../buttons/ShopButton';
import '../Shop.css';

function WorkerUpgrade({ handleUpgrade, shopToggle, worker }) {
  return (
    <div className='upgrade-tab'>
      <h3>Workers</h3>
      <ShopButton onClick={() => handleUpgrade(worker.level_cost, 'worker')} 
                  cost={worker.level_cost} label="Worker +1"
                  shopToggle={shopToggle} />

      <ShopButton onClick={() => handleUpgrade(worker.speed_cost, 'speed')}
                  cost={worker.speed_cost} label="Speed +10%"
                  shopToggle={shopToggle}
                  disabled={worker.speed >= 99.99} />
    </div>
  );
}

export default WorkerUpgrade;
