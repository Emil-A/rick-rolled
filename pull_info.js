'use strict';

var googleTrends = require('google-trends-api');

googleTrends.hotTrendsDetail()
.then(function(results){
	var desc = "";
	var snippets = results.rss.channel[0].item[0]['ht:news_item'];
	for (var i = 0, len = snippets.length; i < len; i++) {
		//console.log(snippets);
		desc += snippets[i]['ht:news_item_snippet'];
	}

	var obj = results.rss.channel[0].item[0];
	var title = obj.title;
	var pic = "https:" + obj['ht:picture'];

	console.log("title: " + title);
	console.log("pic: " + pic);
	console.log("desc: " + desc);

})
.catch(function(err){
	console.log("there was an err", err);
});
