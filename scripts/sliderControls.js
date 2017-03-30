// init code

        var r = new Slider(document.getElementById("red_slider"), document.getElementById("red_slider_input"));
        r.setMaximum(30);
        r.setValue(0);

        var ri = document.getElementById("Slider1");

        r.onchange = function ()
        {
            zoom_amt = 100+(parseInt(r.getValue())*10);
	        ri.value = zoom_amt;
	        document.getElementById("lblZoom").innerHTML = zoom_amt+"%";
	        
	        if(zoom_amt > 100)
	        {
	            document.getElementById("image").className = "drag";
	            document.getElementById("image_overlay").className = "drag";
	            document.getElementById("image2").className = "drag";
	            document.getElementById("image3").className = "drag";
	            document.getElementById("image4").className = "drag";
	            document.getElementById("imageRight").className = "drag";
	            document.getElementById("selection").className = "selection drag";
	        
	        } // end if
	        else
	        {
	            document.getElementById("image").className = "";
	            document.getElementById("image_overlay").className = "";
	            document.getElementById("image2").className = "";
	            document.getElementById("image3").className = "";
	            document.getElementById("image4").className = "";
	            document.getElementById("imageRight").className = "";
	            document.getElementById("selection").className = "selection";
	            
	        } // end else
	        
	        ResizeImage();
        };
