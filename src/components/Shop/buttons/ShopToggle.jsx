// components/Shop/buttons/ShopToggle.jsx
import Toggle from 'react-toggle';
import './ShopToggle.css';

function ShopToggle({ handleShopToggle }) {
    return (
        <div className='shopToggle'>
            <Toggle
                defaultChecked={false}
                aria-label='Enable buying with scroll'
                onChange={handleShopToggle} />
            <span>Enable buying with scroll</span>
        </div>
    );
  }
  
  export default ShopToggle;