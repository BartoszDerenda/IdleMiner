/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Mines': resolve(__dirname, 'src/components/Mines'),
      '@Shop': resolve(__dirname, 'src/components/Shop'),
      '@Stats': resolve(__dirname, 'src/components/Stats'),
      '@StockMarket': resolve(__dirname, 'src/components/StockMarket'),
      '@TimeMachine': resolve(__dirname, 'src/components/TimeMachine'),
    }
  },
};


// https://github.com/dilanx/craco/blob/main/packages/craco/README.md#installation