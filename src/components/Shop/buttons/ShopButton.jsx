// components/Shop/buttons/ShopButton.jsx
import '../Shop.css';

function ShopButton({ onClick, cost, label, disabled }) {
  return (
    <div className='upgrade'>
      <button onClick={onClick} disabled={disabled}>
        {label}
      </button>
      <span>Cost: {cost}</span>
    </div>
  );
}

export default ShopButton;
