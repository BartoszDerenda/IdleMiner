// components/Shop/buttons/ShopButton.jsx
import '../Shop.css';
import currencyIcon from '../../../gold.png';

function ShopButton({ onClick, cost, label, disabled }) {
  return (
    <div className='upgrade'>
      <button onClick={onClick} disabled={disabled}>
        {label}
      </button>
      <span className='currency-align'>{cost}<img src={currencyIcon} alt='currency' /></span>
    </div>
  );
}

export default ShopButton;
