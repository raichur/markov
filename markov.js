var start_words = [], word_stats = {}, terminals = {}, word_list = [];


for (var i = 0; i < word_list.length; i++) {
	var words = word_list[i].split(' ');
	console.log(words);
	terminals[words[words.length-1]] = true;
	start_words.push(words[0]);
	for (var j = 0; j < words.length - 1; j++) {
		if (word_stats.hasOwnProperty(words[j])) {
			word_stats[words[j]].push(words[j+1]);
		} else {
			word_stats[words[j]] = [words[j+1]];
		}
	}
}

var choice = function (a) {
	var i = Math.floor(a.length * Math.random());
	return a[i];
	console.log(a[i]);
};

var make_title = function (min_length) {
	var word = choice(start_words);
	var title = [word];
	while (word_stats.hasOwnProperty(word)) {
		var next_words = word_stats[word];
		word = choice(next_words);
		title.push(word);

		if (title.length > min_length && terminals.hasOwnProperty(word))  break;
		}
	if (title.length < min_length) return make_title(min_length);

return title.join(' ');
};


$('#render').on('click', function () {
	word_list = $('#input').val().split(',');
	var title = make_title(3 + Math.floor(3 * Math.random()));
	$('#output').html(title);
});
