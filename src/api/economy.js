const { axios } = window;

export default {
  async fetchEconomyMeter() {
    const response = await axios.get('/economy/meter');
    return response.data;
  },
  async fetchEconomyClaim() {
    const response = await axios.get('/economy/claim');
    return response.data;
  },
  async fetchEconomyTable() {
    const response = await axios.get('/economy/table');
    return response.data;
  },
  
}
