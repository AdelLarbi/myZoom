var _startX = 0;			// mouse starting positions
var _startY = 0;
var _offsetX = 0;			// current element offset
var _offsetY = 0;
var _dragElement;			// needs to be passed from OnMouseDown to OnMouseMove
var _oldZIndex = 0;			// we temporarily increase the z-index during drag
var _debug = $('debug');	// makes life easier

function InitDragDrop()
{
	document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;
}

function OnMouseDown(e)
{
	// IE is retarded and doesn't pass the event object
	if (e == null) 
		e = window.event; 
	
	// IE uses srcElement, others use target
	var target = e.target != null ? e.target : e.srcElement;
	
//	_debug.innerHTML = target.className == 'drag' 
//		? 'draggable element clicked' 
//		: 'NON-draggable element clicked';

	// for IE, left click == 1
	// for Firefox, left click == 0
	if ((e.button == 1 && window.event != null || 
		e.button == 0) && 
		target.className.indexOf("drag") > -1)
	{
		// grab the mouse position
		_startX = e.clientX;
		_startY = e.clientY;		
		
		// grab the clicked element's position
		//_offsetX = ExtractNumber(target.style.left);
		//_offsetY = ExtractNumber(target.style.top);
		_offsetX = ExtractNumber(target.style.marginLeft);
		_offsetY = ExtractNumber(target.style.marginTop);
		
		// bring the clicked element to the front while it is being dragged
		_oldZIndex = target.style.zIndex;
		target.style.zIndex = 10000;
		
		// we need to access the element in OnMouseMove
		_dragElement = target;

		// tell our code to start moving the element with the mouse
		document.onmousemove = OnMouseMove;
		
		// cancel out any text selections
		document.body.focus();
		
		// prevent text selection in IE
		document.onselectstart = function () { return false; };
		// prevent IE from trying to drag an image
		target.ondragstart = function() { return false; };
		
		// prevent text selection (except IE)
		return false;
	}
}

function ExtractNumber(value)
{
	var n = parseInt(value);
	
	return n == null || isNaN(n) ? 0 : n;
}

function OnMouseMove(e)
{
	if (e == null) 
	    var e = window.event; 

	if(_dragElement.id == "selection")
	    SelectionMove(e);
	else
	    ImageMove(e);

} // end function OnMouseMove

function ImageMove(e)
{
    mLeft = (_offsetX + e.clientX - _startX);
	mTop = (_offsetY + e.clientY - _startY);
        
	mTopLeft = 0;
    mTopMin = 0;
    
    ratio = document.getElementById("Slider1").value;
	    
    if(ratio==0)
        ratio = 100;
            
	if(mode=="normal" || mode=="full")
    {                
        mLeftMin = avWidth - Math.round((ratio/100)*avWidth);
        mTopMin = avHeight - Math.round((ratio/100)*avHeight);
	    
    } // end if
    else if(mode=="day" || mode=="week" || mode=="month")
    {
        split_width = Math.round(avWidth/2);
        split_height = Math.round(avHeight/2);
        
        width = Math.round((ratio/100)*split_width);
        height = Math.round((ratio/100)*split_height);
        
        mLeftMin = split_width-width;
        mTopMin = split_height-height;
        
    } // end else
    else if(mode=="overlay-h" || mode=="overlay-v")
    { 
        mLeftMin = avWidth - Math.round((ratio/100)*avWidth);
        mTopMin = avHeight - Math.round((ratio/100)*avHeight);
        
    } // end if
    
    else if(mode=="split")
    {
        split_width = Math.round(avWidth/2);
        split_height = Math.round(avHeight/2);
        
        width = Math.round((ratio/100)*split_width);
        height = Math.round((ratio/100)*split_height);
        
        mLeftMin = split_width-width;
        mTopMin = split_height-height;
        
    } // end else
	
	if(mLeft > 0)
	    mLeft = 0;
	if(mTop > 0)
	    mTop = 0;
	if(mLeft < mLeftMin)
	    mLeft = mLeftMin;
	if(mTop < mTopMin)
	    mTop = mTopMin;
	
    if(mode=="normal" || mode=="full")
    {	        
        document.getElementById("image").style.marginLeft = mLeft + "px";
        document.getElementById("image").style.marginTop = mTop + "px";
    
    } // end if
	    
    if(mode=="overlay-h" || mode=="overlay-v")
    {
        hozPos = parseInt(document.getElementById("SliderHoz").value);
        vrtPos = parseInt(document.getElementById("SliderVrt").value);
    
        document.getElementById("image").style.marginLeft = mLeft + "px";
        document.getElementById("image").style.marginTop = mTop + "px";
        
        if((clientHeight-110)<650)
            avHeight = 650;
        else
            avHeight = clientHeight-110;
            
        avWidth = Math.round(avHeight/0.75);
        
        if(mode=="overlay-h")
        {
            document.getElementById("image_overlay").style.marginLeft = mLeft-hozPos + "px";
            document.getElementById("image_overlay").style.marginTop = mTop + "px";
            
        } // end if
        
        if(mode=="overlay-v")
        {
            document.getElementById("image_overlay").style.marginLeft = mLeft + "px";
            document.getElementById("image_overlay").style.marginTop = mTop-(avHeight-vrtPos) + "px";
            
        } // end if
    
    } // end if
	    
    if(mode=="day" || mode=="week" || mode=="month")
    {
        document.getElementById("image").style.marginLeft = mLeft + "px";
        document.getElementById("image").style.marginTop = mTop + "px";
        document.getElementById("image2").style.marginLeft = mLeft + "px";
        document.getElementById("image2").style.marginTop = mTop + "px";
        document.getElementById("image3").style.marginLeft = mLeft + "px";
        document.getElementById("image3").style.marginTop = mTop + "px";
        document.getElementById("image4").style.marginLeft = mLeft + "px";
        document.getElementById("image4").style.marginTop = mTop + "px";
    
    } // end if
    
    if(mode=="split")
    {
        document.getElementById("image").style.marginLeft = mLeft + "px";
        document.getElementById("image").style.marginTop = mTop + "px";
        document.getElementById("imageRight").style.marginLeft = mLeft + "px";
        document.getElementById("imageRight").style.marginTop = mTop + "px";
    
    } // end if
	    
    wWidth = 219;
    wHeight = 164;
    
    sWidth = Math.round((100/ratio)*wWidth); // width of selection
    sHeight = Math.round((100/ratio)*wHeight); // height of selection
        
    if(mode=="normal")
    {            
        sLeft = wWidth-sWidth;
        sTop = wHeight-sHeight;
        
        tmp1 = Math.round(mLeft / (avWidth / sWidth));
        tmp2 = Math.round(mTop / (avHeight / sHeight));
        
        //document.getElementById("selection").style.left = (7 - tmp1)+"px";
        //document.getElementById("selection").style.top = (420 - tmp2)+"px";
        document.getElementById("selection").style.marginLeft = -tmp1+"px";
        document.getElementById("selection").style.marginTop = -tmp2+"px";
        
        if(debug)
        {
            showDebug("sLeft: "+sLeft);
            showDebug("sTop: "+sTop);
            showDebug("tmp1: "+(tmp1));
            showDebug("tmp2: "+(tmp2));
            showDebug("image: " + document.getElementById("image").style.marginLeft + ", " + document.getElementById("image").style.marginTop);
            showDebug("sel: " + document.getElementById("selection").style.left + ", " + document.getElementById("selection").style.top);
        
        } // end if
        
        document.getElementById("selection").style.backgroundPosition = tmp1+"px " + tmp2+"px";
        
        // document.getElementById("selection_image").style.marginLeft = tmp1+"px";
        // document.getElementById("selection_image").style.marginTop = tmp2+"px";
    
    } // end if
    if(mode=="overlay-h" || mode=="overlay-v")
    {
        sLeft = wWidth-sWidth;
        sTop = wHeight-sHeight;
        
        tmp1 = Math.round(mLeft / (avWidth / sWidth));
        tmp2 = Math.round(mTop / (avHeight / sHeight));
        
        //document.getElementById("selection").style.left = (7 - tmp1)+"px";
        //document.getElementById("selection").style.top = (420 - tmp2)+"px";
        document.getElementById("selection").style.marginLeft = (- tmp1)+"px";
        document.getElementById("selection").style.marginTop = (- tmp2)+"px";
        
        showDebug("sLeft: "+sLeft);
        showDebug("sTop: "+sTop);
        showDebug("tmp1: "+(tmp1));
        showDebug("tmp2: "+(tmp2));
        showDebug("image: " + document.getElementById("image").style.marginLeft + ", " + document.getElementById("image").style.marginTop);
        showDebug("sel: " + document.getElementById("selection").style.left + ", " + document.getElementById("selection").style.top);
        
        // document.getElementById("selection_image").style.marginLeft = tmp1+"px";
        // document.getElementById("selection_image").style.marginTop = tmp2+"px";
        
        document.getElementById("selection").style.backgroundPosition = tmp1+"px " + tmp2+"px";
    
    } // end if
    if(mode=="day" || mode=="week" || mode=="month")
    {            
        sLeft = wWidth-sWidth;
        sTop = wHeight-sHeight;
        
        tmp1 = Math.round(mLeft / ((avWidth/2) / sWidth));
        tmp2 = Math.round(mTop / ((avHeight/2) / sHeight));
        
        //document.getElementById("selection").style.left = (7 - tmp1)+"px";
        //document.getElementById("selection").style.top = (420 - tmp2)+"px";
        document.getElementById("selection").style.marginLeft = (- tmp1)+"px";
        document.getElementById("selection").style.marginTop = (- tmp2)+"px";
        
        showDebug("sLeft: "+sLeft);
        showDebug("sTop: "+sTop);
        showDebug("tmp1: "+(tmp1));
        showDebug("tmp2: "+(tmp2));
        showDebug("image: " + document.getElementById("image").style.marginLeft + ", " + document.getElementById("image").style.marginTop);
        showDebug("sel: " + document.getElementById("selection").style.left + ", " + document.getElementById("selection").style.top);
        
        // document.getElementById("selection_image").style.marginLeft = tmp1+"px";
        // document.getElementById("selection_image").style.marginTop = tmp2+"px";
        
        document.getElementById("selection").style.backgroundPosition = tmp1+"px " + tmp2+"px";
    
    } // end if
    
    if(mode=="split")
    {            
        sLeft = wWidth-sWidth;
        sTop = wHeight-sHeight;
        
        tmp1 = Math.round(mLeft / ((avWidth/2) / sWidth));
        tmp2 = Math.round(mTop / ((avHeight/2) / sHeight));
        
        fwidth = avWidth+leftMargin;
        panelWidth = Math.round(fwidth/2);
        panelHeight = Math.round(panelWidth*0.75);
        
        //document.getElementById("selection").style.left = Math.round((fwidth-226)/2)-3+(7 - tmp1)+"px";
        //document.getElementById("selection").style.top = (topMargin+panelHeight+3+2 - tmp2)+"px";
        document.getElementById("selection").style.marginLeft = (-tmp1+1)+"px";
        document.getElementById("selection").style.marginTop = (- tmp2+1)+"px";
        
        showDebug("sLeft: "+sLeft);
        showDebug("sTop: "+sTop);
        showDebug("tmp1: "+(tmp1));
        showDebug("tmp2: "+(tmp2));
        showDebug("image: " + document.getElementById("image").style.marginLeft + ", " + document.getElementById("image").style.marginTop);
        showDebug("sel: " + document.getElementById("selection").style.left + ", " + document.getElementById("selection").style.top);
        
        document.getElementById("selection").style.backgroundPosition = tmp1+"px " + tmp2+"px";
    
    } // end if

} // end function ImageMove

function SelectionMove(e)
{    
    mLeft = (_offsetX + e.clientX - _startX);
	mTop = (_offsetY + e.clientY - _startY);
        
    ratio = document.getElementById("Slider1").value;
	    
    if(ratio==0)
        ratio = 100;
        
    wWidth = 219;
    wHeight = 164;
	    
	sWidth = Math.round((100/ratio)*wWidth); // width of selection
    sHeight = Math.round((100/ratio)*wHeight); // height of selection
    
    mLeftMin = wWidth-sWidth;
    mTopMin = wHeight-sHeight;
    
    showDebug("offset: " + _offsetX + "," +  _offsetY);
    showDebug("mPosition: " + mLeft + ", " + mTop);
    showDebug("min: " + mLeftMin + ", " + mTopMin);
        
    if(mLeft < 0)
	    mLeft = 0;
	if(mTop < 0)
	    mTop = 0;
	    
	if(mLeft > mLeftMin)
	    mLeft = mLeftMin;
	    
	if(mTop > mTopMin)
	    mTop = mTopMin;
    
    document.getElementById("selection").style.marginLeft = mLeft + "px";
    document.getElementById("selection").style.marginTop = mTop +"px";
    
    document.getElementById("selection").style.backgroundPosition = -(mLeft)+"px " + -(mTop)+"px";
    
    if(mode=="normal")
    {        
        //tmp1 = Math.round((mLeft-mLeftMin) / (sWidth/avWidth));
        //tmp2 = Math.round((mTop-mTopMin) / (sHeight/avHeight));
        tmp1 = Math.round(mLeft / (sWidth/avWidth));
        tmp2 = Math.round(mTop / (sHeight/avHeight));
        
        
        document.getElementById("image").style.marginLeft = (-tmp1)+"px";
        document.getElementById("image").style.marginTop = (-tmp2)+"px";
    
    } // end if
    
    if(mode=="day" || mode=="week" || mode=="month")
    {   
	    //tmp1 = Math.round((mLeft-mLeftMin) / (sWidth/(avWidth/2)));
        //tmp2 = Math.round((mTop-mTopMin) / (sHeight/(avHeight/2)));
        tmp1 = Math.round((mLeft) / (sWidth/(avWidth/2)));
        tmp2 = Math.round((mTop) / (sHeight/(avHeight/2)));
        
        document.getElementById("image").style.marginLeft = -tmp1 + "px";
        document.getElementById("image").style.marginTop = -tmp2 + "px";
        document.getElementById("image2").style.marginLeft = -tmp1 + "px";
        document.getElementById("image2").style.marginTop = -tmp2 + "px";
        document.getElementById("image3").style.marginLeft = -tmp1 + "px";
        document.getElementById("image3").style.marginTop = -tmp2 + "px";
        document.getElementById("image4").style.marginLeft = -tmp1 + "px";
        document.getElementById("image4").style.marginTop = -tmp2 + "px";
	    
    } // end if
    
    if(mode=="overlay-h" || mode=="overlay-v")
    {
        //tmp1 = Math.round((mLeft-mLeftMin) / (sWidth/(avWidth/2)));
        //tmp2 = Math.round((mTop-mTopMin) / (sHeight/(avHeight/2)));
        tmp1 = Math.round((mLeft) / (sWidth/(avWidth/2)));
        tmp2 = Math.round((mTop) / (sHeight/(avHeight/2)));
//        
//        document.getElementById("image").style.marginLeft = -tmp1 + "px";
//        document.getElementById("image").style.marginTop = -tmp2 + "px";
//        document.getElementById("imageRight").style.marginLeft = -tmp1 + "px";
//        document.getElementById("imageRight").style.marginTop = -tmp2 + "px";
        
        
        
        hozPos = parseInt(document.getElementById("SliderHoz").value);
        vrtPos = parseInt(document.getElementById("SliderVrt").value);
    
        document.getElementById("image").style.marginLeft = -tmp1 + "px";
        document.getElementById("image").style.marginTop = -tmp2 + "px";
        
        if((clientHeight-110)<650)
            avHeight = 650;
        else
            avHeight = clientHeight-110;
            
        avWidth = Math.round(avHeight/0.75);
        
        if(mode=="overlay-h")
        {
            document.getElementById("image_overlay").style.marginLeft = -tmp1-hozPos + "px";
            document.getElementById("image_overlay").style.marginTop = -tmp2 + "px";
            
        } // end if
        
        if(mode=="overlay-v")
        {
            document.getElementById("image_overlay").style.marginLeft = -tmp1 + "px";
            document.getElementById("image_overlay").style.marginTop = -tmp2-(avHeight-vrtPos) + "px";
            
        } // end if
        
        
       
        
    } // end if
    
    if(mode == "split")
    {
        document.getElementById("selection").style.marginLeft = (mLeft+1) + "px";
        document.getElementById("selection").style.marginTop = (mTop+1) +"px";  
    
        //tmp1 = Math.round((mLeft-mLeftMin) / (sWidth/(avWidth/2)));
        //tmp2 = Math.round((mTop-mTopMin) / (sHeight/(avHeight/2)));
        tmp1 = Math.round((mLeft) / (sWidth/(avWidth/2)));
        tmp2 = Math.round((mTop) / (sHeight/(avHeight/2)));
        
        document.getElementById("image").style.marginLeft = -tmp1 + "px";
        document.getElementById("image").style.marginTop = -tmp2 + "px";
        document.getElementById("imageRight").style.marginLeft = -tmp1 + "px";
        document.getElementById("imageRight").style.marginTop = -tmp2 + "px";
    
    } // end if
    
    showDebug("sel: " + document.getElementById("selection").style.left + ", " + document.getElementById("selection").style.top);
    showDebug("image: " + document.getElementById("image").style.marginLeft + ", " + document.getElementById("image").style.marginTop);
	
} // end function SelectionMove

function OnMouseUp(e)
{
	if (_dragElement != null)
	{
		_dragElement.style.zIndex = _oldZIndex;

		// we're done with these events until the next OnMouseDown
		document.onmousemove = null;
		document.onselectstart = null;
		_dragElement.ondragstart = null;

		// this is how we know we're not dragging
		_dragElement = null;
		
		//_debug.innerHTML = "mouse up";
	}
}

// this is simply a shortcut for the eyes and fingers
function $(id)
{
	return document.getElementById(id);
}