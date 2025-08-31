const { NewsAPI } = require("allnewsapi");

const newsApi = new NewsAPI("21438009-686f-4ebc-988f-146e70c4792b", {
    baseUrl: "http://localhost:8080",
});

// Simple search
newsApi.search({ q: "google" })
  .then(results => console.log(results))
  .catch(err => console.error(err));