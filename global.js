//Context menu event handler function
safari.application.addEventListener("contextmenu", handleContextMenu, false);

//Function return localized text string in the current user language
function localizeItString(theString){
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

function test(){
	return "test";
}


//Context menu items show 
function handleContextMenu(event){
	//for images
	if (event.userInfo.name === "IMG"){
		safari.extension.settings.tmpKey = event.userInfo.src;
		var tmpStr = event.userInfo.src;
		var pos = tmpStr.lastIndexOf("/");
		var str = event.userInfo.src.substr(pos, tmpStr.length-1);
		if (str.length > 60){
			var tempStr = str;
			str = tempStr.substr(tempStr.length-61, tempStr.length-1);
		}
		event.contextMenu.appendContextMenuItem("addneuron", localizeItString(LOCALIZED_ADD_IMAGE) +" '..." + str + "' "+ localizeItString(LOCALIZED_IN_LIVA), "addneuron");
		event.contextMenu.appendContextMenuItem("addaxon", localizeItString(LOCALIZED_ADD_IMAGE) +" '..."+ str + "' " + localizeItString(LOCALIZED_IN_RAVA), "addaxon");
	}
	//for links
	else if (event.userInfo.name === "A"){
		safari.extension.settings.tmpKey = event.userInfo.href;
		var str = event.userInfo.href;
		if (str.length > 30)
			str = event.userInfo.href.substr(0, 30)+"...";
		event.contextMenu.appendContextMenuItem("addneuron", localizeItString(LOCALIZED_ADD_LINK) +" '"+ str+"' " + localizeItString(LOCALIZED_IN_LIVA), "addneuron");
		event.contextMenu.appendContextMenuItem("addaxon", localizeItString(LOCALIZED_ADD_LINK) +" '"+ str+"' " + localizeItString(LOCALIZED_IN_RAVA),  "addaxon");
	}
	//for selections
	else{
		safari.extension.settings.tmpKey = event.userInfo;
		var str = event.userInfo;
		if (str.length > 30)
			str = event.userInfo.substr(0, 30)+"...";
		if (str.substr(0,7) == "http://" || str.substr(0,8) == "https://"){
			//for empty - current page url
			// check it's the current site page or the selected text
			event.contextMenu.appendContextMenuItem("addneuron", localizeItString(LOCALIZED_ADD_PAGE) +" '" + str +"' " + localizeItString(LOCALIZED_IN_LIVA), "addneuron");
			event.contextMenu.appendContextMenuItem("addaxon", localizeItString(LOCALIZED_ADD_PAGE) + " '" + str +"' " + localizeItString(LOCALIZED_IN_RAVA),  "addaxon");
		}
		else{
			//for the selected text
			event.contextMenu.appendContextMenuItem("addneuron", localizeItString(LOCALIZED_ADD_SELECTED) + " '" + str +"' " +  localizeItString(LOCALIZED_IN_LIVA), "addneuron");
			event.contextMenu.appendContextMenuItem("addaxon", localizeItString(LOCALIZED_ADD_SELECTED) + " '" + str +"' " + localizeItString(LOCALIZED_IN_RAVA),  "addaxon");
			event.contextMenu.appendContextMenuItem("searchInGoogle", localizeItString(LOCALIZED_SEARCH_IN) + " '" + str +"' " + localizeItString(LOCALIZED_IN) + " Google",  "searchInGoogle");
			event.contextMenu.appendContextMenuItem("searchInWiki", localizeItString(LOCALIZED_SEARCH_IN) + " '" + str +"' " + localizeItString(LOCALIZED_IN) + " Wiki",  "searchInWiki");
			event.contextMenu.appendContextMenuItem("searchInLivarava", localizeItString(LOCALIZED_SEARCH_IN) + " '" + str +"' " + localizeItString(LOCALIZED_IN) + " LivaRava",  "searchInLivarava");
			//alert(localizeItString(localizedAddSelected));
			//alert(localizedAppName.en-us); 
			//var jjj = hello();
			
			alert(localizeItString(LOCALIZED_APP_NAME));
		}
	}
	
}




/*
function instValidate(event) {
    if (event.command !== "showPopover"){
		console.log("event.command !== showPopover");	
        return false;
	}
	console.log("validate popover");
	var myToolbarItem = safari.extension.toolbarItems[0];
	myPop = safari.extension.createPopover(
		"myPopoverID", safari.extension.baseURI + "add-form.html", 352, 325);
		
	myToolbarItem.popover = myPop;
}*/

//Search selected text in Google, wiki, livarava
function searchInGoogle(selection){
	var rUrl = "http://www.google.com/search?q=" + selection;
	var targetWin = safari.application.activeBrowserWindow;	
	targetWin.openTab().url = rUrl;		
}
function searchInWiki(selection){
	var rUrl = "http://en.wikipedia.org/wiki/Special:Search?search=" + selection;
	var targetWin = safari.application.activeBrowserWindow;	
	targetWin.openTab().url = rUrl;		
}
function searchInLivarava(selection){
	var rUrl = "http://www.livarava.com/#" + selection;
	var targetWin = safari.application.activeBrowserWindow;	
	targetWin.openTab().url = rUrl;		
}
//The event handler function for command is sent after clicking context menu item
function performCommand(event) {
	switch(event.command){
	case "myToolbarID": 
		safari.extension.toolbarItems[0].showPopover(); 
		break;
	case "addneuron":
		safari.extension.settings.neuronKey = safari.extension.settings.tmpKey;
//		console.log("show popower neuron - " + safari.extension.settings.tmpKey);
		safari.extension.toolbarItems[0].showPopover(); 
		break;
	case "addaxon":
		safari.extension.settings.axonKey = safari.extension.settings.tmpKey;
//		console.log("show popower axon - " + safari.extension.settings.tmpKey);
		safari.extension.toolbarItems[0].showPopover(); 
		break;
	case "searchInGoogle":
		searchInGoogle(safari.extension.settings.tmpKey);
		break;
	case "searchInWiki":
		searchInWiki(safari.extension.settings.tmpKey);
		break;
	case "searchInLivarava":
		searchInLivarava(safari.extension.settings.tmpKey);
		break;
	default: 
		return;
	}
}
/*
function handleMessage(msgEvent) {
    if (msgEvent.name == 'hidePopover') {
		alert("hide");
//		safari.extension.toolbarItems[0].hidePopover();
//        safari.application.activeBrowserWindow.openTab().url = msgEvent.message;
//        document.getElementById("neuron-modal-form-input").value = msgEvent.message;
    }
}*/


safari.application.addEventListener("command", performCommand, false);
//safari.application.addEventListener("validate", instValidate, false);
