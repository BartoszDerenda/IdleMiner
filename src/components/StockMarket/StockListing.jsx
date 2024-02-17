// components/StockMarket/StockListing.jsx
import { useRef } from 'react';
import './StockMarket.css';

function StockListing({ company, handleStock }) {

    const available_stock = company.total_stock - (company.unavailable_stock + company.possessed_stock);
    const market_share = (company.possessed_stock / company.total_stock) * 100;
    const amount_buy = useRef(null);
    const amount_sell = useRef(null);

    const handleBuyClick = () => {
        handleStock(company, amount_buy.current.value, available_stock, 'buy');
    };

    const handleSellClick = () => {
        handleStock(company, amount_sell.current.value, available_stock, 'sell');
    };

    return (
        <>
        <td>{company.name}</td>
        <td>{company.cost}</td>
        <td>{company.difference}</td>
        <td>
            <input type='number' ref={amount_buy} id={company.token} min='1' max={available_stock} />
            <button onClick={handleBuyClick}>Buy</button>
        </td>
        <td>{available_stock}</td>
        <td>
            <input type='number' ref={amount_sell} id={company.token} min='0' max={company.possessed_stock} />
            <button onClick={handleSellClick}>Sell</button>
        </td>
        <td>{company.possessed_stock}</td>
        <td>{market_share.toFixed(2)}%</td>
        </>
    );
}

export default StockListing;
