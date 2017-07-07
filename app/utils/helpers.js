// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");
// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {
  // Returns a promise object we can .then() off inside our Parent component
  getArticles: function(topic, startDate, endDate) {
    var param = "&" + "q=" + topic + "&sort=newest&begin_date="+ startDate + "&end_date=" + endDate;
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=75880df98d88464481bc441bd8ce869c" + param);
  },
  getSavedArticles: function() {
    return axios.get("/api/saved");
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  saveArticle: function(articleData) {
    return axios.post("/api/saved", articleData).then(function(err,data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
    });
  },
  deleteArticle: function(UID) {
    return axios.delete("/api/saved", {data: {_id: UID}});
  }
};