const MIN_WORD_COUNT = 100;

// when an html element with ID 'submitBio' is clicked
$( "#submitBio" ).click(function() {
	var bioText = $("#bio").val();
	if(bioText.length < MIN_WORD_COUNT){
		alert("bio must contain at least " + MIN_WORD_COUNT + " words");
		return;
	}
	// show the loader
	$("#loader").css("visibility","visible");

	// send a ajax asyncronous REST request to our Node.js server
	$.ajax({
		url: "/watson",
		method: "POST",
		cache: false,
		dataType: 'json',
		data: {bioText: bioText},
		success: function(personalityData) {
			tableWatsonData(personalityData);
			// hide the loader
			$("#loader").css("visibility","hidden");
		},
		error: function(xhr, status, err) {
			console.error("Error getting watson personality. " + err);
			// hide the loader
			$("#loader").css("visibility","hidden");
		}
	});
});

// let the user know client side if their text does not meet the 100 char requirement
$("#bio").keyup(function() {
	var bioText = $("#bio").val();
	var wordCount = getWordCount(bioText);
	$("#wordCount").text(wordCount);
    wordCount >= MIN_WORD_COUNT ? $("#wordCount").css('color', 'green') : $("#wordCount").css('color', 'red');
});

// count the number of spaces there are in the text.
function getWordCount(text){
	var regex = /\s+/gi;
	var replaced = text.trim().replace(regex, ' ');
	// if repalaced is "" then split ' ' will return length of 1 which is incorrect
	if(replaced.length === 0){
		return 0;
	}
	else{
		return replaced.split(' ').length;
	}
}

function tableWatsonData(personalityData){
	// clear any previous data on the page
	$("#tableContainer").html("");

	var big5 = personalityData.personality;
	// loop through the big 5 personality traits
	for(var big5Index in big5){
		var currBig5 = big5[big5Index];
		var currBig5Name = currBig5.name;
		var currBig5Percent = (currBig5.percentile * 100).toFixed(2);

		// create a table for this big5 trait
		var tableHTML = "<table class='traitTable'><caption class='big5'>"+ currBig5Name + " " + currBig5Percent + "%" +
						"</caption><tr><th>Trait</th><th>Percent Match</th></tr>";
		
		// loop through the children of each big5 category trait
		var big5Children = currBig5.children;

		for(var childIndex in big5Children){
			var currChild = big5Children[childIndex];
			var currChildName = currChild.name;
			var currChildPercent = (currChild.percentile * 100).toFixed(2);
			// create a row with the trait name in the first column and the percent match in the second column
			tableHTML+="<tr><td>"+currChild.name+"</td><td>" + currChildPercent + "</td></tr>";
		}

		// close table
		tableHTML+="</table>";
		$("#tableContainer").append(tableHTML);
	}
}