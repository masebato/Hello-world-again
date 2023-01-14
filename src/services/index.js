const axios = require('axios');
const { API_TARGET, PRIV_KEY_TEST } = process.env;

const transations = async (payload) => {
  const response = await axios.post(`${API_TARGET}/transactions`, payload, {
    headers: {
      Authorization: `Bearer ${PRIV_KEY_TEST}`,
    },
  });

  return response;
};

module.exports = { transations };
