var googleTrends = require('google-trends-api');

googleTrends.hotTrendsDetail()
.then(function(results){
	var obj = results.rss.channel[0];
	var title = obj.title;
	var pic = "https:" + obj['ht:picture'];
	var desc = createDesc(results.rss.channel[0].item[0]['ht:news_item']);
	var tags = createTags(desc);

	console.log("title: " + title);
	console.log("pic: " + pic);
	console.log("desc: " + desc);
	console.log("tags: " + tags);

})
.catch(function(err){
	console.log("there was an err", err);
});

function createTags(text) {
	var tags = [];
	var wordCounts = { };
	var words = text.split(/\b/);

	for(var i = 0; i < words.length; i++) {
		wordCounts[words[i].toLowerCase()] = (wordCounts[words[i].toLowerCase()] || 0) + 1;
	}
	
	for(word in wordCounts) {
		if(wordCounts[word] > 1 && word.length > 3) {
			tags.push(word);
		}
	}

	return tags;
}

function createDesc(items) {
	var snippets = items;
	var desc = "";

	for(var i = 0; i < snippets.length; i++) {
		desc += snippets[i]['ht:news_item_snippet'];
	}
	//Get rid of tags <> to comply with youtube description upload
	var regex = /(<([^>]+)>)/ig
	desc = desc.replace(regex, "");

	return desc;
}