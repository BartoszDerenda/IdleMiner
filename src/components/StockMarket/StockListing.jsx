// components/StockMarket/StockListing.jsx
import { useRef } from 'react';
import './StockMarket.css';

function StockListing({ company, handleStock }) {

    const available_stock = company.total_stock - (company.unavailable_stock + company.possessed_stock);
    const market_share = (company.possessed_stock / company.total_stock) * 100;
    const amount_buy = useRef(null);
    const amount_sell = useRef(null);
    const arrowUp = '▲ ';
    const arrowDown = '▼ '; // I tried ASCII and Unicode, but I couldn't make it safely work.


    const handleBuyClick = () => {
        const amount = parseInt(amount_buy.current.value, 10); // Parse as an integer
        handleStock(company, amount, available_stock, 'buy');
    };

    const handleSellClick = () => {
        const amount = parseInt(amount_sell.current.value, 10); // Same here
        handleStock(company, amount, available_stock, 'sell');
    };

    return (
        <>
        <td>{company.name}</td>
        <td>{company.cost}</td>
        <td className={company.difference > 0 ? ('positive') : ('negative')}>
            {company.difference > 0 ? (arrowUp + company.difference) : (arrowDown + company.difference)}%
        </td>
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
