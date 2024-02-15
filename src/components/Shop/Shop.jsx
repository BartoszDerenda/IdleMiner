// components/Shop/upgrades/OreUpgrade.jsx
import PickaxeUpgrade from './upgrades/PickaxeUpgrade';
import WorkerUpgrade from './upgrades/WorkerUpgrade';
import OreUpgrade from './upgrades/OreUpgrade';
import ShopToggle from './buttons/ShopToggle';
import './Shop.css';

function Shop({ handleUpgrade, handleShopToggle, shopToggle, pickaxe, drill, worker, ore }) {
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
