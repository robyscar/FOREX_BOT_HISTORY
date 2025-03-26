// JScript File
// ===================================================================
// Author: Nont Tephan
// Create Date: 03/01/2007
// ===================================================================

// -------------------------------------------------------
// handles print preview
var location 
function beforeprint(){
 //window.location = ""
   //alert("beforeprint");
   location = document.location
   //alert(document.location);
   document.location = ""
   //alert(document.location);
}

function afterprint(){
//Reload the window
//setTimeout("window.location.reload()",50)
 //alert("afterprint");
 //alert(document.location);
 document.location = location
 //alert(document.location);
}

//window.onbeforeprint=beforeprint
//window.onafterprint=afterprint

// -------------------------------------------------------

function downloadFile(url)
{
    //alert(url);
    //window.location="http://localhost/BTWSDD/Download.aspx?location=Jy2%2fdgqBc%2bfhIkPY9iv8P3Y%2b3k13dp1n%2fXwEMx32V3JWKic66BPZwK4S1yYFAKKc6luN71I2Hj6wcS4Rwnq0d9lwzdNl9Z%2baWijhX8AjQsg%3d&labelName=8Wwc9Z9nj%2fQsX%2b1d%2fdK3xg%3d%3d&deleteSource=mS67%2bEqPqoU%3d"
   //window.location=url;
    //location.href=url;
    //alert(window.location);
}

function openNewWindow(url)
{
       var useWidth = screen.availWidth*95/100;
       var useHeight = screen.availHeight*90/100;
       var leftPos = (screen.width) ? (screen.availWidth-useWidth)/2 : 0;
       //var topPos = (screen.height) ? (screen.availHeight-useHeight)/2 : 0;
       var opt = "status=1,toolbar=0,menubar=0,location=0,resizable=0,scrollbars=1,width=";
       opt = opt + useWidth.toString() + ",height=" + useHeight.toString();
       opt = opt + ",left=" + leftPos.toString();
       //opt = opt +",top=" + topPos.toString();
	   window.open(url,'_blank', opt);
}


function openPrintPreviewWindow(url)
{
       var useWidth = screen.availWidth*95/100;
       var useHeight = screen.availHeight*90/100;
       var opt = "status=1,toolbar=0,menubar=1,location=0,resizable=1,scrollbars=1,width=";
       opt = opt + useWidth.toString() + ",height=" + useHeight.toString();
       preview=window.open(url,'_blank', opt);
       preview.moveTo(0,0);
}

function toggleVisibility(id)
{
       //alert(id);
       //alert('toggleVisibility');
       var obj = document.getElementById(id)
       //alert(obj.name)
       //alert(obj.id)
       if (obj.style.visibility)
       {
       style.visibility='hidden'
            if (obj.style.visibility = "visible")
            {
                obj.style.visibility = "hidden"
            }
            else
            {
                obj.style.visibility = "visible"
            }
       }
       else
       {
            obj.style.visibility = "hidden"
       }
}

function setWidthPercentage(id, percentage)
{
       var useWidth = myWidth*percentage/100;
       var obj = document.getElementById(id);
       var calWidth = screen.availWidth.toString() + "px"
       obj.width = calWidth
}

function fixToPopupSize(obj)
{
      var myWidth = 0, myHeight = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
      }
      obj.width = myWidth
      obj.height = myHeight
}

function alertSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  window.alert( 'Width = ' + myWidth );
  window.alert( 'Height = ' + myHeight );
}


//Custom Image Button Clicked.
//http://www.codeproject.com/useritems/ClickOnceButton.asp
var idOfImageButtonsToDisable = '';
var idOfButtonsToDisable = '';	
function CustomButtonClicked(obj)
{										
	idOfImageButtonsToDisable = '';
	//alert(obj);
	//alert(obj.disabled);
		
	if ( obj.disabled == false )
	{				
		var pgForm = obj.form;	
		//alert(pgForm);	
		//if (pgForm == 'undifined') pgForm = document.getElementById('form1');	
		//alert(pgForm);				
		
		//note: unfortunately type=image never comes up in Form.Elements therefore searching them by tag name INPUT
		//search all type=image, button, submit, reset and disabling them.
		var inputs = pgForm.getElementsByTagName('input');
		//alert(inputs);
		
		for ( var i=inputs.length-1; i>=0; i--)
		{
			try
			{
				var currentButton = inputs[i];
				if ( (currentButton.type == 'submit' || currentButton.type == 'button' || currentButton.type == 'reset') && currentButton.disabled == false )
				{
					//storing ids of all buttons, will require when enabled back later.
					idOfButtonsToDisable += (idOfButtonsToDisable==''?'':',') + currentButton.id
					
					CreateDuplicateButtonOverSame(currentButton);
				}																	

				//Image Buttons and not if already disabled (duplicate button will always be disabled.)
				if ( currentButton.type == 'image' && currentButton.disabled == false )
				{														
					//If image button is already disabled, do not touch it.										
					if ( currentButton.src.toLowerCase().indexOf('_disable.') >= 0 )
						continue;

					//storing ids of all image buttons, will require when enabled back later.
					idOfImageButtonsToDisable += (idOfImageButtonsToDisable==''?'':',') + currentButton.id ;

					CreateDuplicateButtonOverSame(currentButton);					
				}
			}
			catch(e)
			{
				//alert(e.description);
			}
		}

		//Searching all <BUTTON> tags and disabling them as well.
		var buttons = pgForm.getElementsByTagName('button');
		
		for ( var i=buttons.length-1; i>=0; i--)
		{
			try
			{
				var currentButton = buttons[i];
				
				//storing ids of all buttons, will require when enabled back later.
				idOfButtonsToDisable += (idOfButtonsToDisable==''?'':',') + currentButton.id
					
				CreateDuplicateButtonOverSame(currentButton);
			}
			catch(e)
			{
				//alert(e.description);
			}
		}


		setTimeout('ReEnableAllButtons(\''+obj.id+'\')',8000);
	}
}
function CreateDuplicateButtonOverSame(currentButton)
{
	//Create a duplicate button same as this 1 and disabling that.
	var dummyBtn = currentButton.cloneNode();
	dummyBtn.id = dummyBtn.id+'_clone';
	dummyBtn.disabled = true;
	//ERROR: dont know why, but name attribute is not resetting here, still removing 'name' as it is conflicting
	var nm = dummyBtn.getAttribute('name');
	dummyBtn.removeAttribute('name');
	dummyBtn.setAttribute('name',nm+'_clone');
	dummyBtn.setAttribute('onclick','');
	dummyBtn.style.display = 'none';

	//Inserting duplicate buttons before end of body
	document.body.insertAdjacentElement('beforeEnd',dummyBtn);																				
	
	//Getting co-ordinate of orginial image buttons.
	var mouseY = document.body.scrollTop + parseFloat(currentButton.getBoundingClientRect().top);
	var mouseX = document.body.scrollLeft + parseFloat(currentButton.getBoundingClientRect().left);										

	//co-ordinates which are received are 2 pixel extra and do not fully cover the actual object
	mouseX = (mouseX >= 2)?mouseX-2:mouseX;
	mouseY = (mouseY >= 2)?mouseY-2:mouseY;
	
	//i'm not hiding actual button because document.activeElement will not be available then, 
	//just placing disable image/button on top of actual button/image button.
	currentButton.style.position = 'static';
	dummyBtn.style.position = 'absolute';										
	dummyBtn.style.left = mouseX;
	dummyBtn.style.top = mouseY;					

	if ( dummyBtn.tagName == 'BUTTON' )
	{
		dummyBtn.innerHTML = currentButton.innerHTML;
	}
	else //INPUT					
	{
		if ( dummyBtn.type == 'image' )
		{
			//Changing Image to Disable image.
			//must have file 'add_disable.gif','deleteImage_disable.jpg' in directory structure if actual image button url is 'add.gif', 'deleteImage.jpg' respectively.
			var extensiondot = currentButton.src.lastIndexOf('.');
			dummyBtn.src = currentButton.src.substr(0,extensiondot) + '_disable'+currentButton.src.substr(extensiondot);
		}
	}
	dummyBtn.style.display = '';
}

function ReEnableAllButtons(objId)
{
	//Image Button Object which fired the event.
	var obj = document.getElementById(objId);
	
	if ( idOfButtonsToDisable != '' )
	{
		var buttonIds = idOfButtonsToDisable.split(',');
		
		for (var i=0; i< buttonIds.length; i++)
		{
			var btnClone = document.getElementById(buttonIds[i]+'_clone');
			if ( btnClone != null )
				btnClone.removeNode(true);
			document.getElementById(buttonIds[i]).style.position='';
		}
		idOfButtonsToDisable = '';
	}

	if ( idOfImageButtonsToDisable != '' )
	{
		var imageButtonIds = idOfImageButtonsToDisable.split(',');
		
		for (var i=0; i< imageButtonIds.length; i++)
		{							
			var imgbtnClone = document.getElementById(imageButtonIds[i]+'_clone');
			if ( imgbtnClone != null )
				imgbtnClone.removeNode(true);
			document.getElementById(imageButtonIds[i]).style.position='';
		}
		idOfImageButtonsToDisable = '';
	}
}																			

//Call this function, if you want Enable the image before the time.
function EnableCustomButton(objId)
{
	ReEnableAllButtons(objId);
}				