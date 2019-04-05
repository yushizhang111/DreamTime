//var pieces = document.getElementsByTagName('svg');


var previousIndex = 0;
var index = 0;

var animals = [];

function iterateRecords(data, index, start) {

	//console.log(data.result.records[index]._id);
	var record = data.result.records[index];
	var recordId = record._id
	var recordEnglish = record.English
	var recordYugambeh = record.Yugambeh

	animals[recordEnglish] = {
		recordId,
		recordYugambeh
	};
	//console.log(animals);
	//console.log(recordEnglish);


	if (start == 0) {
		$("#records").append(
			$('<div class="record">').append(
				$('<h2 id="record_id" style="color:white">').text("No." + " " + recordId),
				$('<p id="record_English" style="color:white;font-size:1.5em">').text("English:" + " " + recordEnglish),
				$('<p id="record_Yugambeh" style="color:white;font-size:1.5em">').text("Yugambeh:" + " " + recordYugambeh),

			)
		);
	} else {
		$('#record_id').text("No." + " " + recordId),
			$('#record_English').text("English:" + " " + recordEnglish),
			$('#record_Yugambeh').text("Yugambeh:" + " " + recordYugambeh)
	};
	$('#record_id').attr("value", recordId);
	$('#record_English').attr("value", recordEnglish);
	$('#record_Yugambeh').attr("value", recordYugambeh);
	$('#id').each(function (indexes, element) {});

	var a = document.getElementById("animalsvg");
	var svgDoc = a.contentDocument;
	var delta = svgDoc.getElementsByClassName("animalimg");

	for (var i = 0; i < delta.length; i++) {
		console.log(delta[i].id);
		if (delta[i].id == index + 1) {
			delta[i].style.opacity = "1";
		} else {
			delta[i].style.opacity = "0.5";
		}
	}
}

$("#record-btn-prev").click(function () {
	var data = {
		resource_id: '3e39dd7d-e777-4f47-9160-95aaca34bff5', // the resource id

	};

	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function (data) {
			index = index - 1;
			if (index < 0) {
				index = data.result.total - 1;
			}
			localStorage.setItem("slqData", JSON.stringify(data));
			iterateRecords(data, index, 1);
		}
	});
});
$("#record-btn-next").click(function () {
	var data = {
		resource_id: '3e39dd7d-e777-4f47-9160-95aaca34bff5', // the resource id

	};

	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function (data) {
			if (index >= data.result.total - 1) {
				index = 0;
			} else {
				index = index + 1;
			}
			localStorage.setItem("slqData", JSON.stringify(data));
			iterateRecords(data, index, 1);
		}
	});
});

$(document).ready(function () {
	var data = {
		resource_id: '3e39dd7d-e777-4f47-9160-95aaca34bff5', // the resource id

	};
	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function (data) {
			localStorage.setItem("slqData", JSON.stringify(data));
		}
	});

	var a = document.getElementById("animalsvg");

	a.addEventListener("load", function () {
		var svgDoc = a.contentDocument;
		var delta = svgDoc.getElementsByClassName("animalimg");
		var d = JSON.parse(localStorage.getItem("slqData"));
		iterateRecords(d, 0, 0);

		for (var i = 0; i < delta.length; i++) {
			delta[i].addEventListener('click', function () {
				var d = JSON.parse(localStorage.getItem("slqData"));
				index = this.id - 1
				iterateRecords(d, index, 1);
			});
		}
	})
});
