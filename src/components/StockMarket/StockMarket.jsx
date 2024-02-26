// components/StockMarket/StockMarket.jsx
import './StockMarket.css';
import StockListing from './StockListing';
import { useState, useEffect } from 'react';
// import { Chart as ChartJS } from 'chart.js/auto';
// import { Bar, Doghnut, Line } from 'react-chartjs-2';

function StockMarket({ currency, setCurrency }) {

  const [coalCompany, setCoalCompany] = useState({
    name: 'Coal Co.',
    token: 'coal',
    total_stock: 100000,
    unavailable_stock: 79286,
    possessed_stock: 0,
    difference: 0,
    direction: true,
    history: [],
    cost: 1300,
  });
  
  const [mithrilCompany, setMithrilCompany] = useState({
    name: 'Mithril Brothers',
    token: 'mithril',
    total_stock: 100000,
    unavailable_stock: 69212,
    possessed_stock: 0,
    difference: 0,
    direction: true,
    history: [],
    cost: 3900,
  });
  
  const [rubyCompany, setRubyCompany] = useState({
    name: 'Ruby & Rubinson',
    token: 'ruby',
    total_stock: 100000,
    unavailable_stock: 57974,
    possessed_stock: 0,
    difference: 0,
    direction: true,
    history: [],
    cost: 6400,
  });


  /* Stock market */
  function handleCompany(company) {

    const growthFactor = 1.01 + (Math.random() * 0.04); // Random growth factor between 1% - 5%
    const declineFactor = 1.01 - (Math.random() * 0.04);

    const updatedHistory = [...company.history, company.cost];
    const truncatedHistory = updatedHistory.slice(-10);

    let updatedCost = company.cost * (company.direction ? growthFactor : declineFactor);

    updatedCost = Math.max(updatedCost, 0);
    const calc_difference = ((updatedCost - company.cost) / company.cost) * 100;

    // Update direction based on a random chance
    const changeDirectionChance = 0.2; // 20% chance to change direction
    const shouldChangeDirection = Math.random() < changeDirectionChance;
    const direction = shouldChangeDirection ? !company.direction : company.direction;

    switch (company.token) {

      case 'coal':
        setCoalCompany(prevCoal => ({...prevCoal,
          difference: calc_difference.toFixed(2),
          history: truncatedHistory,
          direction: direction,
          cost: updatedCost.toFixed()}));
        break;

      case 'mithril':
        setMithrilCompany(prevMithril => ({...prevMithril,
          difference: calc_difference.toFixed(2),
          history: truncatedHistory,
          direction: direction,
          cost: updatedCost.toFixed()}));
        break;
        
      case 'ruby':
        setRubyCompany(prevRuby => ({...prevRuby,
          difference: calc_difference.toFixed(2),
          history: truncatedHistory,
          direction: direction,
          cost: updatedCost.toFixed()}));
        break;

      default:
        break;
    };
  };


  useEffect(() => {
    const stockIntervalId = setInterval(() => {
      handleCompany(coalCompany);
      handleCompany(mithrilCompany);
      handleCompany(rubyCompany);
    }, 1000);

    return () => clearInterval(stockIntervalId);
  }, [coalCompany, mithrilCompany, rubyCompany]);


  function handleStock(company, amount, available, action) {
    if (action === 'buy' 
    && amount <= available 
    && (amount * company.cost) <= currency
    && amount > 0) {
      switch (company) {

        case coalCompany:
          setCoalCompany(prevCoal => ({...prevCoal, 
            possessed_stock: prevCoal.possessed_stock + amount,
            }));
          setCurrency(currency - (amount * company.cost));
          break;

        case mithrilCompany:
          setMithrilCompany(prevMithril => ({...prevMithril, 
            possessed_stock: prevMithril.possessed_stock + amount,
            }));
          setCurrency(currency - (amount * company.cost));
          break;

        default:
          setRubyCompany(prevRuby => ({...prevRuby, 
            possessed_stock: prevRuby.possessed_stock + amount,
            }));
          setCurrency(currency - (amount * company.cost));

      };
    }

    if (action === 'sell' 
    && amount <= company.possessed_stock
    && amount > 0) {
      switch (company) {

        case coalCompany:
          setCoalCompany(prevCoal => ({...prevCoal, 
            possessed_stock: prevCoal.possessed_stock - amount,
          }));
          setCurrency(currency + (amount * company.cost));
          break;

        case mithrilCompany:
          setMithrilCompany(prevMithril => ({...prevMithril, 
            possessed_stock: prevMithril.possessed_stock - amount,
          }));
          setCurrency(currency + (amount * company.cost));
          break;

        default:
          setRubyCompany(prevRuby => ({...prevRuby, 
            possessed_stock: prevRuby.possessed_stock - amount,
          }));
          setCurrency(currency + (amount * company.cost));
          break;

      };
    };
  };

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
