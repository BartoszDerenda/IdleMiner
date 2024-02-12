// components/Shop/upgrades/PickaxeUpgrade.jsx
import ShopButton from '../buttons/ShopButton';
import '../Shop.css';

function PickaxeUpgrade({ handleUpgrade, pickaxe }) {
  return (
    <div className='upgrade-tab'>
      <h3>Pickaxe</h3>
      <ShopButton onClick={() => handleUpgrade(pickaxe.power_cost, 'power')} cost={pickaxe.power_cost} label="Power +1" />
      <ShopButton onClick={() => handleUpgrade(pickaxe.multi_cost, 'multistrike')} cost={pickaxe.multi_cost} label="Multistrike +1" />
    </div>
  );
}

export default PickaxeUpgrade;