$(document).ready(function(){

	var geocoder = new google.maps.Geocoder();

	var debug = true;

	var api = {
		'submitReport':'http://54.186.110.31/submitReport/',
		'getReports':''
	};

	var base_url = 'http://localhost/hack/Zariya/';

	var customSettings = {};
	customSettings.language = "en";

	if(localStorage.getItem('language') != null){
		customSettings.language = localStorage.getItem('language');
	}

	log("Langauge: "+customSettings.language);

	

	//Local Database
	var zariya = {};
	zariya.indexedDB = {};

	init();

	function init(){
		$("#incidentDate").val(myDateFormatter());
		getCurrentLocation();
	}

	function pushDetails(){
		var fd = [];
		var person = $("#person").val();
		if(person.length > 0){
			fb += "person"
		}
		var doYouKnow = $("#doyouknow").val(); //Y / N
		var firstTimeCrime = $("#firsttimecrime").val(); //Y / N
		var incidentList = $("#incidentList").val(); //Select Box
		var otherIncidence = $("#otherIncidence").val();
		var location = $("#location").val();
		var locationLat = $("#locationLat").val();
		var locationLng = $("#locationLng").val();
		var incidentDate = $("#incidentDate").val();
		var incidentTime = $("#incidentTime").val();
		var comments = $("#comments").val();
		var firstName = $("#firstName").val();
		var lastName = $("#lastName").val();
		var email = $("#email").val();
		var number = $("#number").val();
		sendData(fd);
	}

	//Post form submission
	function sendData(formData){
		alert(api.submitReport);
		var dataPush = $.ajax({
	            type: "POST",
	            dataType: "json",
	            crossDomain: true,
	            data:formData,
	            url: api.submitReport,
	            success: function (res) {
	            	if(res.id.length > 0){
	            		return res.id;
	            	}
	            	return 0;
	            }
		});
	}

	//GeoTargeting
	$(document).on("click","#getGeo",function(e){
		e.preventDefault();
		var lat1 = $("#lat").val();
		var lng1 = $("#lng").val();
		var op = getReverseLatLng(lat1+","+lng1);
	});

	function getCurrentLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				//Success
				log("CURRENT POSITION==========");
				log(position);
				if(position.coords){
					var crd = position.coords;
					var latLng = crd.latitude+","+crd.longitude;
					log(latLng);
					//$("#latlng").val(latLng);
					$("#lat").val(crd.latitude);
					$("#lng").val(crd.longitude);
					//$("#getGeo").trigger("click");
					getReverseLatLng(latLng);
				}
			},function(){
				//Error
				return false;
			});
		}
	}


	function getReverseLatLng(latlong){
		if(latlong.length >0){
			var splitLatLng = latlong.split(',',2);
			var lat = parseFloat(splitLatLng[0]);
			var lng = parseFloat(splitLatLng[1]);
			var latlong = new google.maps.LatLng(lat,lng);
			geocoder.geocode({'latLng': latlong}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					log("GEO REVERSE STA=============");
					log(results);
					if(results.length >0){
						$("#location").val(results[0]['formatted_address']);
					}
					log("GEO REVERSE END=============");
				}else{
					return false;
				}
			});
		}
		return false;
	}

	function log(message){
		if(debug){
			console.log(message);
		}
	}

	//Langauge selection
	$(document).on("click","#languages li",function(){
		var language = $(this).attr("data-language");
		localStorage.setItem('language',language);
		customSettings.language = language;
	});


	$(document).on("click",".submit",function(e){
		e.preventDefault();
		var form_data = $("#startWizard").serialize();
		log(form_data);
		sendData(form_data);

	});

	$(document).on("click",".m1",function(e){
		//e.preventDefault();
		var value = $(this).val();
		if(value == "SURVIVOR"){
			$("#onSurvivor").show();
		}else{
			$("#onSurvivor").hide();
		}
	});

	function myDateFormatter() {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        //var date = day + "/" + month + "/" + year;
        var date= year+"-"+month+"-"+day;

        return date;
    }; 

});