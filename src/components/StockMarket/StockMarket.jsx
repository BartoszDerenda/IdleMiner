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
    prev_difference: 1,
    consecutive_growth: 0,
    history: [],
    cost: 1250,
  });
  
  const [mithrilCompany, setMithrilCompany] = useState({
    name: 'Mithril Brothers',
    token: 'mithril',
    total_stock: 100000,
    unavailable_stock: 69212,
    possessed_stock: 0,
    difference: 0,
    prev_difference: 1,
    consecutive_growth: 0,
    history: [],
    cost: 5000,
  });
  
  const [rubyCompany, setRubyCompany] = useState({
    name: 'Ruby & Rubinson',
    token: 'ruby',
    total_stock: 100000,
    unavailable_stock: 57974,
    possessed_stock: 0,
    difference: 0,
    prev_difference: 1,
    consecutive_growth: 0,
    history: [],
    cost: 6300,
  });


  /* Stock market */
  function handleCompany(company) {

    let mainMultiplier = company.prev_difference;
    let wildCard = 0;

    const updatedHistory = [...company.history, company.cost];
    const truncatedHistory = updatedHistory.slice(-10);
    const updatedCost = Math.round(company.cost * mainMultiplier + wildCard);
    const calc_difference = ((updatedCost - company.cost) / company.cost) * 100;
    console.log(mainMultiplier);

    const diceRoll = Math.floor(Math.random() * 10);
    if (mainMultiplier >= 1.015) {
      if (diceRoll < company.consecutive_growth) {
        mainMultiplier = mainMultiplier + (Math.floor(Math.random() * 50) / 1000);
      }
    } else {
      mainMultiplier = 1;
      if (diceRoll < company.consecutive_growth) {
        mainMultiplier = mainMultiplier - (Math.floor(Math.random() * 50) / 1000);
      }
    }

    switch (company.token) {

      case 'coal':
        setCoalCompany(prevCoal => ({...prevCoal,
          difference: calc_difference.toFixed(2),
          history: truncatedHistory,
          prev_difference: mainMultiplier,
          cost: updatedCost}));
        break;

      case 'mithril':
        setMithrilCompany(prevMithril => ({...prevMithril,
          difference: calc_difference.toFixed(2),
          history: truncatedHistory,
          prev_difference: mainMultiplier,
          cost: updatedCost}));
        break;
        
      case 'ruby':
        setRubyCompany(prevRuby => ({...prevRuby,
          difference: calc_difference.toFixed(2),
          history: truncatedHistory,
          prev_difference: mainMultiplier,
          cost: updatedCost}));
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
