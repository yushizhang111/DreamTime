var pieces = document.getElementsByTagName('svg');


var index=0;

function iterateRecords(data,index,start) {
	
	console.log(data.result.records[index]._id);
	var record = data.result.records[index];
	var recordId = record._id
	var recordEnglish = record.English
	var recordYugambeh = record.Yugambeh
	var recordSound = record.Pronunciation

    if(start==0){
		$("#record-btn-prev").hide();
		$("#records").append(
			$('<div class="record">').append(
				$('<h2 id="record_id" style="color:white">').text("No."+" "+recordId),
				$('<p id="record_English" style="color:white;font-size:1.5em">').text("English:"+" "+recordEnglish),
				$('<p id="record_Yugambeh" style="color:white;font-size:1.5em">').text("Yugambeh:"+" "+recordYugambeh),
				$('<p id="record_Sound" style="color:yellow;font-size:1.5em">').text("Pronunciation:"+" "+recordSound)
				)
		);
	}else{
		$('#record_id').text("No."+" "+recordId),
		$('#record_English').text("English:"+" "+recordEnglish),
		$('#record_Yugambeh').text("Yugambeh:"+" "+recordYugambeh),
		$('#record_Sound').text("Pronunciation:"+" "+recordSound)
	};
	$('#record_id').attr("value",recordId);
	$('#record_English').attr("value",recordEnglish);
	$('#record_Yugambeh').attr("value",recordYugambeh);
	$('#record_Sound').attr("value",recordSound);
	$('.bodypart').each(function(indexes,element){
		element.setAttribute("style","fill:#57c9d5;");
		console.log(element.getAttribute("id"));
		if(element.getAttribute("id")==recordEnglish || element.getAttribute("data-position")==recordEnglish || element.getAttribute("name")==recordEnglish || element.getAttribute("value")==recordEnglish ){
			element.setAttribute("style","fill:#ff7d16;");
			
		};
	});
}

function recordIndex(data,e){
	var n=0;
	$.each(data.result.records, function(recordKey, recordValue) {
		
		var recordEnglish = recordValue["English"];
		if (recordEnglish == e){
			return false;
		}
		n=n+1;
	});
	return n;
}
function bodyClick(e){
	var data = {
		resource_id: '4ea75e17-cb1e-473e-9b6b-c0227b1fa787', // the resource id
	};
	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function(data) {
			
			localStorage.setItem("slqData", JSON.stringify(data));
			index=recordIndex(data,e);
			console.log(e);
			console.log(index);
			if (index>0){
				iterateRecords(data,index,1);
				$("#record-btn-prev").show();
				$(".soundbox").remove();
		
			} 
			if (index<1) {
				iterateRecords(data,index,1);
				$("#record-btn-prev").hide();
				$(".soundbox").remove();
			}
			$("#record-btn-next").show();
		}
	});
}

function mouseover(e){
	e.forEach(function(element) {
		$(element).attr("style","fill:#ff7d16;cursor:pointer;");
	});
	
	
	
}
function mouseleave(e){
	e.forEach(function(element) {
		
		    var recordEnglish=$('#record_English').attr("value");
			console.log(recordEnglish);
			if($(element).attr("id")==recordEnglish || $(element).attr("data-position")==recordEnglish || $(element).attr("name")==recordEnglish || $(element).attr("value")==recordEnglish ){
				$(element).attr("style","fill:#ff7d16;");
				
			}else{
				$(element).attr("style","fill:#57c9d5;");
			}
		
	});
		
}



$(document).ready(function() {
	console.log("hello");
	var data = {
		resource_id: '4ea75e17-cb1e-473e-9b6b-c0227b1fa787', // the resource id

	};
	$.ajax({
		url: 'https://data.gov.au/api/3/action/datastore_search',
		data: data,
		dataType: 'jsonp',
		cache: true,
		success: function(data) {
			
			localStorage.setItem("slqData", JSON.stringify(data));
			iterateRecords(data,0,0);
			
			$("#record-btn-prev").click(function(){
				if (index>0){
					index=index-1;
					iterateRecords(data,index,1);
					$(".soundbox").remove();
		
				} 
				if (index<1) {
					$("#record-btn-prev").hide();
				}
				$("#record-btn-next").show();
			});
			$("#record-btn-next").click(function(){
				if (index >= data.result.total - 2) {
					$("#record-btn-next").hide();
				}
				if(index<data.result.total-1){
							index=index+1;
				};
				iterateRecords(data,index,1);
				$(".soundbox").remove();
				$("#record-btn-prev").show();

			});
				
		}
		});

});
 