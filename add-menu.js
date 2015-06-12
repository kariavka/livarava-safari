//Context menu handleContextMenu event listener
document.addEventListener("contextmenu", handleContextMenu, false);
function handleContextMenu(event) {
	var sel = window.parent.getSelection().toString();
	var url = window.location.href;
	console.log("url"+url); 
//clicks on link - send url
	var target = event.target;
	while (target != null && target.nodeType == Node.ELEMENT_NODE && target.nodeName.toLowerCase() != "a"){
		target = target.parentNode;
	}
	if (target.nodeName ==="A"){
		var userInfo = {
			"name": target.nodeName,
			"href": target.href
		}
		sel = "";
		safari.self.tab.setContextMenuEventUserInfo(event, userInfo);
	}
//clicks on image - send url image	
	else if (event.target.nodeName ==="IMG"){
		var userInfo = {
			"name": event.target.nodeName,
			"src": event.target.src
		}
		sel = "";
		safari.self.tab.setContextMenuEventUserInfo(event, userInfo);
	}
//selection text and click - send selection text		
	else if (sel != ""){
		var sel2 = sel;
		sel = "";
		safari.self.tab.setContextMenuEventUserInfo(event, sel2);
	}
//clicks on empty space - send current page url	
	else if (sel ==""){
		console.log("inter url");
		var page = url;
		safari.self.tab.setContextMenuEventUserInfo(event, page);
	}
}




