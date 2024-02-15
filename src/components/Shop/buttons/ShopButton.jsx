// components/Shop/buttons/ShopButton.jsx
import '../Shop.css';
import currencyIcon from '../../../gold.png';

function ShopButton({ onClick, shopToggle, cost, label, disabled }) {

  const scrollShopping = shopToggle ? onClick : null;
  const buttonClassName = shopToggle ? 'cursor-scroll' : 'cursor-pointer';

  return (
    <div className='upgrade'>
      <button className={buttonClassName} onClick={onClick}  onWheel={scrollShopping} disabled={disabled}>
        {label}
      </button>
      <span className='currency-align'>{cost}<img src={currencyIcon} alt='currency' /></span>
    </div>
  );
}

export default ShopButton;
