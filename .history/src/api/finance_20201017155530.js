const { axios } = window;

export default {
    async fetchFinance(date) {
        const response = await axios.get('/finance/finance', { params: { ny: date } });
        return response;
    },
    //项目计价回款
    async fetchFinanceValuation(date) {
      const response = await axios.get('/finance/valuation', { params: { ny: date } });
      return response;
    },
    async fetchFinancePlanEarning(date) {
      const response = await axios.get('/finance/planEarning');
      return response;
    },
    async fetchMoneyCollection(date) {
      const response = await axios.get('/finance/planEarning', { params: { ny: date } });
      return response;
    },
  
}


