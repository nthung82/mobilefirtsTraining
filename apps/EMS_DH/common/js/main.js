var busyIndicator;
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	WL.Client.connect({
		onSuccess:function() {

			console.log("Connected to MFP");
						
		}, 
		onFailure:function(f) {

			console.log("Failed to connect to MFP, not sure what to do now.", f);
			
		}
	});
	// Common initialization code goes here
	busyIndicator = new WL.BusyIndicator();
	loadFeeds();
}
function loadFeeds(){
	busyIndicator.show();
	
	/*
	 * The REST API works with all adapters and external resources, and is supported on the following hybrid environments: 
	 * iOS, Android, Windows Phone 8, Windows 8. 
	 * If your application supports other hybrid environments, see the tutorial for MobileFirst 6.3.
	 */
	var resourceRequest = new WLResourceRequest("/adapters/EMS/getFeed", WLResourceRequest.GET);
	
	resourceRequest.send().then(
			loadFeedsSuccess,
			loadFeedsFailure
	);
}



function loadFeedsSuccess(result){
	//alert('33333333334gdgfd333333' + JSON.stringify(result));
	//alert(result.responseJSON.rows[0].key.full_name);
//	alert('33333333334gdgfd333333' + result.rows[0]);
//	alert(result.rows[0].key.full_name);
//	alert("_Call successfully_"+result.responseJSON.rows.length);	
//	WL.Logger.debug("Feed retrieve success");
	busyIndicator.hide();
//
	if (result.responseJSON.rows.length>0)
		{
		
		displayFeeds(result.responseJSON.rows);
		}
//	else 
//		loadFeedsFailure();
//	
}

function loadFeedsFailure(result){
	alert("Call Faield" + result.toString());
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	WL.SimpleDialog.show("Engadget Reader", "Service not available. Try again later.", 
			[{
				text : 'Reload',
				handler : WL.Client.reloadApp 
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);	
}
function displayFeeds(items){
	
	var ul = $('#itemsList');
	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').text(items[i].key.age+"|"+items[i].key.full_name+"|"+items[i].key.employee_id);		
		ul.append(li);
		li.append("<br/>");
	}
}
function addnew(){}