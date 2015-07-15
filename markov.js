var startwords = []
var wordstats = {};
var terminals = {};


$('#render').on('click', function () {

	var wordlist = $('#input').val().split(', ');
	
	
	for (var i = 0; i < wordlist.length; i++) {
	var words = wordlist[i].split(' ');
	terminals[words[words.length-1]] = true;
	startwords.push(words[0]);
	for (var j = 0; j < words.length - 1; j++) {
		if (wordstats.hasOwnProperty(words[j])) {
			wordstats[words[j]].push(words[j+1]);
		} else {
			wordstats[words[j]] = [words[j+1]];
		}
	}
}

var choice = function (a) {
	var i = Math.floor(a.length * Math.random());
	return a[i];
};

var make_title = function (min_length) {
	var word = choice(startwords);
	var title = [word];
	while (wordstats.hasOwnProperty(word)) {
		var next_words = wordstats[word];
		word = choice(next_words);
		title.push(word);
		if (title.length > min_length && terminals.hasOwnProperty(word)) {
			break;
		}
	}
	if (title.length < min_length) return make_title(min_length);
	return title.join(' ');
};

var title = make_title(3 + Math.floor(3 * Math.random()));
	$('#output').html(title);




});

