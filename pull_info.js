'use strict';

var googleTrends = require('google-trends-api');

googleTrends.hotTrendsDetail()
.then(function(results){
	console.log(results.rss.channel[0].item[0]);
})
.catch(function(err){
	console.log("there was an err", err);
});
