
function iterateRecords(data) {
	
	$.each(data.result.records, function(recordKey, recordValue) {
        
        var recordId = recordValue["_id"];
        var recordEnglish = recordValue["English"];
        var recordYugambeh = recordValue["Yugambeh"];
        var recordSound = recordValue["Pronunciation"]

        $("#filter-text").keyup(function() {

			var searchTerm = $(this).val();
            console.log(searchTerm);
        
            $(".record").hide();
            $(".record:contains('" + searchTerm + "')").show();
            $("#filter-count strong").text($(".record:visible").length);
        
        });
        if (recordSound==null){
			$("#records").append(

				$('<div class="record">').append(
					$('<p id="record_English" style="color:white;font-size:1.5em">').text("English:"+" "+recordEnglish),
					$('<p id="record_Yugambeh" style="color:white;font-size:1.5em">').text("Yugambeh:"+" "+recordYugambeh),
					
				)
			);
		}else{
			$("#records").append(

				$('<div class="record">').append(
					$('<p id="record_English" style="color:white;font-size:1.5em">').text("English:"+" "+recordEnglish),
					$('<p id="record_Yugambeh" style="color:white;font-size:1.5em">').text("Yugambeh:"+" "+recordYugambeh),
					$('<p id="record_Sound" style="color:yellow;font-size:1.5em">').text("Pronunciation:"+" "+recordSound),
					$('<button class="btn btn-outline-primary" type="button" value="Play" style="color:aqua;border-color: aqua;">').text("Play").click(function(){
						$("head").append(
							$('<link class="soundbox" rel="stylesheet" href="../style/soundbox.css">')
						)
						responsiveVoice.speak(recordSound, 'UK English Female', {
							rate: 1
					
						});
					})
				)
			);
		}
    });
};	

$(document).ready(function() {
	var data = {
        resource_id: '4ea75e17-cb1e-473e-9b6b-c0227b1fa787', // the body resource id

	};
	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function(data) {
			
			localStorage.setItem("slqData", JSON.stringify(data));
			iterateRecords(data);
			
		}
		}
	  );

});

$(document).ready(function() {
	var data = {
		resource_id: '3e39dd7d-e777-4f47-9160-95aaca34bff5', // the animal resource id

	};
	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function(data) {
			
			localStorage.setItem("slqData", JSON.stringify(data));
			iterateRecords(data,0,0);
		}
		}
	  );
});