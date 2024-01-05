const axios = require("axios");

export const fetcher = (url) => {
  axios.get(url).then((res) => {
    res.data;
  });
};

console.log(fetcher("/api/spotify"));
