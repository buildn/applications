/**
 * 
 */
var adminlanding = function () {
	
	
	var $ = getElementById;
	var commonfn = new commonframework();

	function getElementById(elemId){
		return document.getElementById(elemId);
	}

	var selectedItemsTeamList = [];
	var selectedItemsMyList = null;
	
	this.landinginit = landinginit;
	function landinginit() {
		serviceObj = new service();
		
		var inputObj = {};
		inputObj.roleId = $("viewId").value;
		
		serviceObj.getAdminDocList(inputObj,landinginitMyListResponse);	
		
	}
	
	this.landinginitMyListResponse = landinginitMyListResponse;
	function landinginitMyListResponse(responseData) {
		//alert(responseData.responseText);
		$("myGrid").innerHTML = responseData.responseText;
		//selectRole(inputObj.roleId);
		//alert(1);
		if($("mytable")){
			//try{
			sorter.init();
			/*} catch(ex){
				for(var k in ex){
					alert(k + ex[k]);
				}
			}*/
		}
		//alert(2);
	}
	
	this.selectRole=selectRole;
	function selectRole(roleId){
		$("viewId").value=roleId;
	}
	
	/*this.setAssignment=setAssignment;
	function setAssignment(control){
		if(control.checked == true){
			//selectedItemsTeamList[selectedItemsTeamList.length] = control.value;
			if(control.value != null && control.value != ''){
				selectedItemsTeamList.push(control.value);
			}
		}
	}*/
	
	this.assignMe=assignMe;
	function assignMe(agreementId){
		var input = [];
		input.push(agreementId);
		serviceObj.assignToMe(input,assignRespFn);
		
	}
	
	this.assignRespFn=assignRespFn;
	function assignRespFn(responseData){
		if(responseData.responseText === "true"){
			alert("Assignment assigned to you for further action.");
			//resetAssignmentList();
			reloadGridData();
		} else {
			alert("There was an error in the process. Please try again.");
		}
	}
	
	/*function resetAssignmentList(){
		for(var k in selectedItemsTeamList){
			$(selectedItemsTeamList[k]).disabled = true;
			selectedItemsTeamList[k]=null;
		}
		//alert(selectedItemsTeamList);
	}*/
	
	this.setMyAssignment=setMyAssignment;
	function setMyAssignment(control){
		
		if(control.checked == true){
			//selectedItemsMyList[selectedItemsMyList.length] = control.value;
			//alert(selectedItemsMyList);
			if(selectedItemsMyList == null){
				selectedItemsMyList = control.value;
			} else {
				alert('You can work on one agreement at a time');
				//jDialog('You can work on one agreement at a time.');
				control.checked=false;
				return false;
			}
		} else { //User unchecks a row
			selectedItemsMyList = null;
		}
		$('checkerStart').disabled=true;
		$('checkerHold').disabled=true;
		$('checkerComplete').disabled=true;
		$('checkerStatus').disabled=true;
		$('checkerStatus').value=-1;
		$('checkerComments').value='';
			
		if(selectedItemsMyList != null){
			
			var statusCd = $(selectedItemsMyList+'statusCode').value;
			var numPages = $(selectedItemsMyList+'numPages').value;
			var numFields = $(selectedItemsMyList+'numFields').value;
			
			if(!statusCd) {
				statusCd = $(selectedItemsMyList+'statusCode').innerHTML;
			}
			if(!numPages){
				numPages = $(selectedItemsMyList+'numPages').innerHTML;
			}
			if(!numFields){
				numFields = $(selectedItemsMyList+'numFields').innerHTML;
			}
			$('numPages').value = numPages;
			$('numFields').value = numFields;
			
			if($("viewId").value == "1"){
				if(statusCd == 1){
					$('checkerStart').disabled=false;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=true;
					$('checkerStatus').disabled=true;
				} else if(statusCd == 2){
					$('checkerStart').disabled=true;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=false;
					$('checkerStatus').disabled=false;
					$('checkerComments').disabled = false;
				}
			} else if($("viewId").value == "2"){
				if(statusCd == 16){
					$('checkerStart').disabled=false;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=true;
					$('checkerStatus').disabled=true;
				} else if(statusCd == 17){
					$('checkerStart').disabled=true;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=false;
					$('checkerStatus').disabled=false;
					$('checkerComments').disabled = false;
				} else {
					assignMe(selectedItemsMyList);
				}
				
			} else if($("viewId").value == "3"){
				if(statusCd == 19){
					$('checkerStart').disabled=false;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=true;
					$('checkerStatus').disabled=true;
				} else if(statusCd == 20){
					$('checkerStart').disabled=true;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=false;
					$('checkerStatus').disabled=false;
					$('checkerComments').disabled = false;
				} else if(statusCd == 21){
					$('checkerStart').disabled=true;
					$('checkerHold').disabled=true;
					$('checkerComplete').disabled=false;
					$('checkerStatus').disabled=true;
					$('checkerComments').disabled = false;
					var smeComments = $(selectedItemsMyList+'smeComments').value;
					if (! smeComments) {
						smeComments = $(selectedItemsMyList+'smeComments').innerHTML;
					}
					$('checkerComments').value = smeComments;
				} else {
					assignMe(selectedItemsMyList);
				}
			}
			
		} 
	}
	
	this.startClick=startClick;
	function startClick(){
		/*if(selectedItemsMyList.length == 0){
			alert("Please select an agreement");
			return false;
		}
		if(selectedItemsMyList.length > 1){
			alert("You can work with only one Agreement at a time");
			return false;
		}*/
		
		var inputObj = {};
		inputObj.agreementId=selectedItemsMyList;//[0];
		inputObj.roleId=$("viewId").value;
		
		if($("viewId").value == "1"){
			inputObj.statusCode=2; //For Maker Start hardcoding the value
		} else if($("viewId").value == "2"){
			inputObj.statusCode=17; //For Checker Start hardcoding the value
		} else if($("viewId").value == "3"){
			inputObj.statusCode=20; //For SME Start hardcoding the value
		}					
		inputObj.user={userId:$("selectedUserId").value, roleId:$("viewId").value};
		
		serviceObj.startProcess(inputObj,startRespFn);		
	}
	
	this.startRespFn=startRespFn;
	function startRespFn(responseData){
		
		var responseObject = JSON.parse(responseData.responseText);
		var respStatus = responseObject.response.responseMessage;
		if(respStatus == "Success"){
			var docList = responseObject.docList;
			for(var k in docList){
				var agrId = docList[k].agreementId;
				//alert('3a1'+agrId+'###'+k);
				if(agrId){
					$(agrId).checked=false;
					
					$(agrId+'statusDescription').innerHTML=docList[k].statusDescription;
					$(agrId+'numPages').innerHTML=docList[k].numPages;
					$(agrId+'numFields').innerHTML=docList[k].numFields;
					$(agrId+'statusCode').innerHTML=docList[k].statusCode;
					$(agrId+'statusCode').value=docList[k].statusCode;
					
					var stsCode = docList[k].statusCode;
					
					if($("viewId").value == "1"){
						$(agrId+'makerComments').innerHTML=docList[k].makerComments;
						if(stsCode != 1 && stsCode != 2){
							$(agrId).disabled=true;
						}
					} else if($("viewId").value == "2"){
						$(agrId+'makerStatus').innerHTML=docList[k].makerStatus;
						$(agrId+'checkerComments').innerHTML=docList[k].checkerComments;
						$(agrId+'errorReason').innerHTML=docList[k].errorReason;						
						if(stsCode != 16 && stsCode != 17){
							$(agrId).disabled=true;
						}
					} else if($("viewId").value == "3"){
						$(agrId+'checkerComments').innerHTML=docList[k].checkerComments;
						$(agrId+'smeComments').innerHTML=docList[k].smeComments;
						if(stsCode != 19 && stsCode != 20 && stsCode != 21){
							$(agrId).disabled=true;
						}
					}				
				}
			}
			/*$('checkerStart').disabled=true;
			$('checkerComplete').disabled=false;
			$('checkerStatus').disabled=false;
			$('checkerComments').value='';
			$('checkerStatus').value=-1;			
			selectedItemsMyList = null;*/
			
			disableAll();
			
			//$('makerActionsPanel').style="display:none";
		}
		
	}
	
	function disableAll(){
		$('checkerStart').disabled=true;
		$('checkerHold').disabled=true;
		$('checkerComplete').disabled=true;
		$('checkerStatus').disabled=true;
		$('checkerComments').disabled=true;
		$('checkerComments').value='';
		$('checkerStatus').value=-1;			
		$('numPages').value='';
		$('numFields').value='';
		selectedItemsMyList = null;	
		if($("viewId").value == "2"){
		  $('errorReasonList').value = -1;
		}
	}
	
	this.completeClick=completeClick;
	function completeClick(){
		/*if(selectedItemsMyList.length == 0){
			alert("Please select an agreement");
			return false;
		}
		if(selectedItemsMyList.length > 1){
			alert("You can work with only one Agreement at a time");
			return false;
		}*/
		
		if($("viewId").value == "2" || $("viewId").value == "3"){
			if ($('numPages').value == null || $('numPages').value == '' || $('numPages').value == 0) {
				alert("Please fill up Number of Pages in Comment Section befor marking the agreement as Complete...");
				return false;
			}
			if ($('numFields').value == null || $('numFields').value == '' || $('numFields').value == 0) {
				alert("Please fill up Number of Fields in Comment Section befor marking the agreement as Complete...");
				return false;
			}
			if ($('checkerComments').value == null || $('checkerComments').value == '') {
				alert("Please fill up Comments in Comment Section befor marking the agreement as Complete...");
				return false;
			}
		}
		var inputObj = {};
		inputObj.agreementId=selectedItemsMyList;//[0];
		inputObj.roleId=$("viewId").value;
		inputObj.comment=$('checkerComments').value;
		inputObj.numPages=$('numPages').value;
		inputObj.numFields=$('numFields').value;
		
		if($("viewId").value == "1"){
			inputObj.statusCode=3; //For Maker Complete hardcoding the value
		} else if($("viewId").value == "2"){
			inputObj.statusCode=18; //For Checker Complete hardcoding the value
		} else if($("viewId").value == "3"){
			inputObj.statusCode=22; //For SME Complete hardcoding the value
		}
		inputObj.user={userId:$("selectedUserId").value, roleId:$("viewId").value};
		
		serviceObj.completeProcess(inputObj,completeRespFn);		
	}
	
	this.completeRespFn=completeRespFn;
	function completeRespFn(responseData){
		
		var responseObject = JSON.parse(responseData.responseText);
		
		var respStatus = responseObject.response.responseMessage;
		
		if(respStatus == "Success"){
			var docList = responseObject.docList;
			
			for(var k in docList){
				var agrId = docList[k].agreementId;
				if(agrId){
					$(agrId).checked=false;
					//$(agrId).disabled=true;
					$(agrId+'statusDescription').innerHTML=docList[k].statusDescription;
					$(agrId+'numPages').innerHTML=docList[k].numPages;
					$(agrId+'numFields').innerHTML=docList[k].numFields;
					$(agrId+'statusCode').innerHTML=docList[k].statusCode;
					$(agrId+'statusCode').value=docList[k].statusCode;
					
					var stsCode = docList[k].statusCode;
					if($("viewId").value == "1"){
						$(agrId+'makerComments').innerHTML=docList[k].makerComments;
						if(stsCode != 1 && stsCode != 2){
							$(agrId).disabled=true;
						}
					} else if($("viewId").value == "2"){
						$(agrId+'makerStatus').innerHTML=docList[k].makerStatus;
						$(agrId+'checkerComments').innerHTML=docList[k].checkerComments;
						$(agrId+'errorReason').innerHTML=docList[k].errorReason;
						
						if(stsCode != 16 && stsCode != 17){
							$(agrId).disabled=true;
						}
					} else if($("viewId").value == "3"){
						$(agrId+'checkerComments').innerHTML=docList[k].checkerComments;
						$(agrId+'smeComments').innerHTML=docList[k].smeComments;					
						if(stsCode != 19 && stsCode != 20 && stsCode != 21){
							$(agrId).disabled=true;
						}
					}
				}
			}
			/*$('checkerStart').disabled=true;
			$('checkerHold').disabled=true;
			$('checkerComplete').disabled=true;
			$('checkerStatus').disabled=true;	
			$('checkerComments').disabled=true;	
			$('checkerComments').value='';
			$('checkerStatus').value=-1;
			
			selectedItemsMyList = null;*/
			
			disableAll();
		}
	}	
	
	this.holdClick=holdClick;
	function holdClick(){
		/*if(selectedItemsMyList.length == 0){
			alert("Please select an agreement");
			return false;
		}
		if(selectedItemsMyList.length > 1){
			alert("You can work with only one Agreement at a time");
			return false;
		}*/
		//jDialog('Do you realy want to hold it?',function(){
			if($("viewId").value == "1" && $('checkerStatus').value == 15){				
				if($('checkerComments').value == null || $('checkerComments').value == ''){
					alert('Please fill in comments section');
					return false;
				}
			}
	
			if($("viewId").value == "2" && $('checkerStatus').value == 15){
				if($('checkerComments').value == null || $('checkerComments').value == '' || $('errorReasonList').value == -1){
					alert('Please fill in both comments section and Error Reason');
					return false;
				}
			}
			
			if($("viewId").value == "3" && $('checkerStatus').value == 21){
				if($('checkerComments').value == null || $('checkerComments').value == ''){
					alert('Please fill in comments section');
					return false;
				}
			}		
			
			
			var inputObj = {};
			inputObj.agreementId=selectedItemsMyList;//[0];
			inputObj.roleId=$("viewId").value;
			inputObj.statusCode=$('checkerStatus').value;
			inputObj.user={userId:$("selectedUserId").value, roleId:$("viewId").value};
			inputObj.comment=$('checkerComments').value;
			if($("viewId").value == "2"){
			  inputObj.errorReasonCode=$('errorReasonList').value;
			}
			inputObj.numPages=$('numPages').value;
			inputObj.numFields=$('numFields').value;
			serviceObj.holdProcess(inputObj,holdRespFn);
			//jDialog.currentDialog.remove();
		//});
	}
	
	this.holdRespFn=holdRespFn;
	function holdRespFn(responseData){
		
		var responseObject = JSON.parse(responseData.responseText);
		
		var respStatus = responseObject.response.responseMessage;
		
		if(respStatus == "Success"){
			var docList = responseObject.docList;
			
			for(var k in docList){
				var agrId = docList[k].agreementId;
				if(agrId){
					$(agrId).checked=false;
					//$(agrId).disabled=true;
					$(agrId+'statusDescription').innerHTML=docList[k].statusDescription;
					$(agrId+'numPages').innerHTML=docList[k].numPages;
					$(agrId+'numFields').innerHTML=docList[k].numFields;
					$(agrId+'statusCode').innerHTML=docList[k].statusCode;
					$(agrId+'statusCode').value=docList[k].statusCode;
					
					var stsCode = docList[k].statusCode;
					if($("viewId").value == "1"){
						$(agrId+'makerComments').innerHTML=docList[k].makerComments;
						if(stsCode != 1 && stsCode != 2){
							$(agrId).disabled=true;
						}
					} else if($("viewId").value == "2"){
						$(agrId+'makerStatus').innerHTML=docList[k].makerStatus;
						$(agrId+'checkerComments').innerHTML=docList[k].checkerComments;
						$(agrId+'errorReason').innerHTML=docList[k].errorReason;
						if(stsCode != 16 && stsCode != 17){
							$(agrId).disabled=true;
						}
					} else if($("viewId").value == "3"){
						$(agrId+'checkerComments').innerHTML=docList[k].checkerComments;
						$(agrId+'smeComments').innerHTML=docList[k].smeComments;
					
						if(stsCode != 19 && stsCode != 20 && stsCode != 21){
							$(agrId).disabled=true;
						}
					}
				}
			}
			/*$('checkerStart').disabled=true;
			$('checkerHold').disabled=true;
			$('checkerComplete').disabled=true;
			$('checkerStatus').disabled=true;	
			$('checkerComments').disabled=true;	
			$('checkerComments').value='';
			$('checkerStatus').value=-1;
			
			if($("selectedRoleId").value == "3"){
				$('checkerComplete').disabled=false;
			}
			selectedItemsMyList = null;*/
			
			disableAll();
		}
	}	
	
	this.reloadGridData=reloadGridData
	function reloadGridData(){
		//serviceObj.getTeamDocList(landinginitResponse);
		var inputObj = {};
		inputObj.roleId=$("viewId").value;
		serviceObj.getAdminDocList(inputObj,landinginitMyListResponse);
		selectedItemsMyList = null;
	}
	
	this.setHoldStatus=setHoldStatus;
	function setHoldStatus(stsCombo){
		
		if(stsCombo.value != -1){
			$('checkerHold').disabled=false;
			$('checkerStart').disabled=true;
			$('checkerComplete').disabled=false;
			$('checkerComments').disabled=false;
			if($("viewId").value == "2"){
				$('errorReasonList').disabled=false;
			}
		}
	}
	
	function showMessage(msg,msgType){
		//if($('msgPanel')){
			//document.getElementById('msgPanel').style="display:''";
			/*if(msgType === 'I'){
				$('msgPanel').style="color:Blue";
			}
			if(msgType === 'E'){
				$('msgPanel').style="color:Red";
			}*/
			//$('msgPanel').outerHTML = "<div style='display:visible'>"+msg+"</div>";
		//}
		window.showModalDialog(msg);
	}	
	  
} 