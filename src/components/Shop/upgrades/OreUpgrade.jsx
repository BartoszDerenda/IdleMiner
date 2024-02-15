// components/Shop/upgrades/OreUpgrade.jsx
import ShopButton from '../buttons/ShopButton';
import '../Shop.css';

function OreUpgrade({ handleUpgrade, shopToggle, ore }) {
  return (
    <div className='upgrade-tab'>
      <h3>Ore</h3>
      <ShopButton onClick={() => handleUpgrade(ore.quality_cost, 'quality')}
                  cost={ore.quality_cost} label="Ore quality +1" 
                  shopToggle={shopToggle} />

      <ShopButton onClick={() => handleUpgrade(ore.gem_cost, 'gems')} 
                  cost={ore.gem_cost} label="Gem chance +0.25%"
                  shopToggle={shopToggle} />
    </div>
  );
}

export default OreUpgrade;
