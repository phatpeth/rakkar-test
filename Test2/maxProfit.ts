const maxProfit = (prices: number[]) => {
  let profit = 0;
  let minPrice = Infinity;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > profit) {
      profit = prices[i] - minPrice;
    }
  }
  return profit;
};

export default maxProfit;
