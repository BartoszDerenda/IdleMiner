// components/StockMarket/StockMarket.jsx
import './StockMarket.css';
import StockListing from './StockListing';
// import { Chart as ChartJS } from 'chart.js/auto';
// import { Bar, Doghnut, Line } from 'react-chartjs-2';

function StockMarket({ handleStock, coalCompany, mithrilCompany, rubyCompany }) {
  return (
    <table className='stock-market-table'>
      <tbody>
        <tr>
          <td><h3>Company name</h3></td>
          <td><h3>Price</h3></td>
          <td><h3>Fluctuation</h3></td>
          <td><h3>Buy stock</h3></td>
          <td><h3>Available</h3></td>
          <td><h3>Sell stock</h3></td>
          <td><h3>Possessed</h3></td>
          <td><h3>Market share</h3></td>
        </tr>
        <tr className='stock-listing'>
          <StockListing company={rubyCompany} handleStock={handleStock} />
        </tr>
        <tr className='stock-listing'>
          <StockListing company={mithrilCompany} handleStock={handleStock} />
        </tr>
        <tr className='stock-listing'>
          <StockListing company={coalCompany} handleStock={handleStock} />
        </tr>
      </tbody>
    </table>
  );
}

export default StockMarket;
