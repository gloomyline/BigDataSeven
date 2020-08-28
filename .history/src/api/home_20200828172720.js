const { axios } = window;

export default {
  async fetchHomeData(date) {
    const response = await axios.get('/home', { params: { ny: date } });
    console.log("fetchHomeData",response)
    return response;
  },
  async fetchHomeMapData(date) {
    const response = await axios.get('/home/map', { });
    return response;
  },
  async fetchHomeMapCompanyData() {
    const response = await axios.get('home/mapCompany');
    return response;
  },
}