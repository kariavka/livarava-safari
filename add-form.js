//Function return localized text string in the current user language
function localizePopoverString(theString){
	var ui_language = window.navigator.language;
	var default_language = "en-us";
	switch (ui_language){
		case "de-de":
		case "es-es":
		case "fr-fr":
		case "ru-ru":
		case "uk-uk": 
			return theString[ui_language]; 	
		default:
			return theString["en-us"];
			//return theString[default_language]; 
	}
}
//Function localized popover text
function localizePopover()
{
	document.getElementById('neuron_title').innerHTML = localizePopoverString(LOCALIZED_LIVA);
	document.getElementById('akson_title').innerHTML = localizePopoverString(LOCALIZED_RAVA);
	document.getElementById('neuron').placeholder = localizePopoverString(LOCALIZED_ADD_LIVA_HERE)+" ("+localizePopoverString(LOCALIZED_TOU_CAN_UES_RIGHT_CLICK)+")";
	document.getElementById('axon').placeholder = localizePopoverString(LOCALIZED_ADD_RAVA_HERE)+" ("+localizePopoverString(LOCALIZED_TOU_CAN_UES_RIGHT_CLICK)+")";
	document.getElementById('sendit').value = localizePopoverString(LOCALIZED_NEURON_IT);
}
//Event listener for event before popover show
safari.application.addEventListener("popover", function(event) {

//	console.log("before popover show");
	if (event.target.identifier === "myPopover"){//myPopoverID
		localizePopover();
		document.getElementById('neuron').value = safari.extension.settings.neuronKey;
		document.getElementById('axon').value = safari.extension.settings.axonKey;
		
		document.getElementById('goHome').onclick = function(){
			safari.self.hide();
			var homeUrl = "http://www.livarava.com";
			var targetWin = safari.application.activeBrowserWindow;	
			targetWin.openTab().url = homeUrl;		
			return false;
		}
		
		window.onblur = function () {
		    // do stuff when popover is closed
			safari.extension.settings.neuronKey = document.getElementById('neuron').value;
			safari.extension.settings.axonKey = document.getElementById('axon').value;
		};
		
		document.getElementById("form-add").onsubmit = function(){	
			var theNeuron = document.getElementById('neuron').value;
			var theAxon = document.getElementById('axon').value;
			if (theNeuron !=""){ //only neuron is required
				console.log("onsubmit");	
			
				//clear form fields and storage key values
				document.getElementById('neuron').value = "";
				document.getElementById('axon').value ="";
				safari.extension.settings.neuronKey = "";
				safari.extension.settings.axonKey = "";
				safari.self.hide();
				//opens new tab with URL + neuron and axon values
		        var rUrl = "http://www.livarava.com/neuron/new/?liva=" + theNeuron+"&rava="+theAxon;

			    var targetWin = safari.application.activeBrowserWindow;	
				targetWin.openTab().url = rUrl;	
				return false;

			}
			else{
				document.getElementById('neuron').placeholder = localizePopoverString(LOCALIZED_LIVA_PARAMETR_IS_REQUIRED);
				document.getElementById('neuron').focus(); 
				return false;
			} 
			
		}
	}
	else return false;
//	event.target.contentWindow.location.reload();
}, true);