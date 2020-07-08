const { axios } = window;

export default {
  async fetchHomeData(date) {
    const response = await axios.get('/home', { params: { ny: date } });
    return response;
  },
}