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
      const response = await axios.get('/finance/moneyCollecton', { params: { ny: date } });
      return response.data;
    },
    //双清管理
    async fetchShuangQing(date) {
      const response = await axios.get('/finance/finishOff', { params: { ny: date } });
      return response.data;
    },
    //片区预算
    async fetchdistrictBudget(date) {
      const response = await axios.get('/finance/companyBudget', { params: { ny: date } });
      return response.data
    },
    async fetchdistrictBudgetDetail(date) {
      const response = await axios.get('/finance/third', { params: { ny: date } });
      return response.data
    },
  
}


