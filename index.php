<?php 
$target="target";
	if (isset($_POST["selected_folder"])) {
		$path_dir    	        = $target.$_POST["selected_folder"];
		$path_images    		= $target.$_POST["selected_folder"];
		$correct_path_images    = '';
		$folders1       = scandir($path_dir);							
		$found 			= false;	                                        
        $days = array();	

		if ($_POST["situation"] == 1) {
			$year_month_day = explode("-", $_POST["selected_date"]);
			$year_month     = $year_month_day[0].'-'.$year_month_day[1];
		if(sizeof($folders1) > 2) {
			foreach ($folders1 as $folder1) {								   		    
			    if (!is_dir($path_dir.'/'.$folder1)) continue;
			    if ($folder1 === $year_month) {			    	
			    	$path_dir = $path_dir.'/'.$folder1;
			    	$path_images = $path_images.'/'.$folder1;
			    	$folders2 = scandir($path_dir);
			    	if(sizeof($folders2) > 2) {															    	
				    	foreach ($folders2 as $folder2) {		    				    		
				    		if (!is_dir($path_dir.'/'.$folder2)) continue;		    		
				    		if ($_POST["selected_date"] === $folder2) {				    							    		
				    			$path_dir = $path_dir.'/'.$folder2;
				    			$path_images = $path_images.'/'.$folder2;
				    			$path_images = glob($path_images."/{*.jpg,*.png,*.bmp,*.tiff}", GLOB_BRACE);							
								if (count($path_images)) {
									$found = true;
									foreach ($path_images as $i => $image) {
										$correct_path_images[$i][1] = $image;
									}									
								}				    					    						    				
				    		break; } 
				    	}
			    	} 		    	
			    break; } 			    
			} 
		} 
		echo json_encode(($found)? $correct_path_images: 1);		
	} else if ($_POST["situation"] == 2) {
        	if (sizeof($folders1) > 2) {
                foreach ($folders1 as $folder1) {                                           
                    if (!is_dir($path_dir.'/'.$folder1) || $folder1 != $_POST["current_date"]) continue;
                    $found = true;
                    break; 
                }
                if ($found) {
                    $path_dir    = $path_dir.'/'.$_POST["current_date"];
                    $path_images = $path_images.'/'.$_POST["current_date"];
                    $folders2    = scandir($path_dir);
                        if (sizeof($folders2) > 2) {
                            for ($i=0; $i <= 31; $i++) $days[$i] = 0;                                                                                                                     
                            foreach ($folders2 as $folder2) {                                       
                                if (!is_dir($path_dir.'/'.$folder2) || $folder2 == '.' || $folder2 == '..') continue;                                                                                                                                                                                                                   
                                $temp_path = $path_images.'/'.$folder2;                            
                                $images_found = glob($target.$temp_path."/{*.jpg,*.png,*.bmp,*.tiff}", GLOB_BRACE);                            
                            	// echo  $images_found;
                                if (count($target.$temp_path)) {
                                    $day = explode("-", $folder2);
                                    $days[intval($day[2])] = 1;                                
                                }                                                                                                                   
                            }
                        } else $days[0] = -1;
                } else $days[0] = -1;
            } else $days[0] = -1;
            echo json_encode($days);  
        }
	} else {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns:="http://www.w3.org/1999/xhtml" xml:lang="fr">
<head>	
	<title>home</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="mondersky" />
	<link rel="stylesheet" href="css/design.css" type="text/css"/>	
	<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/themes/smoothness/jquery-ui.css"/>	
	<link rel="stylesheet" href="jquery.mCustomScrollbar.css"/>	
    <script type="text/javascript" src="scripts/jquery.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.dropdown.js"></script>
    <script type="text/javascript" src="scripts/drag.js"></script>
    <script type="text/javascript" src="scripts/scripts.js"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/jquery2.js"></script>
	<script>$$=$.noConflict();</script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>	
    <script src="jquery.mCustomScrollbar.concat.min.js"></script>	

    <link href="css/styles.css" rel="stylesheet" type="text/css" />
    <link href="css/print.css" rel="stylesheet" type="text/css" media="print" />
    <link type="text/css" rel="StyleSheet" href="css/bluecurve/bluecurve.css" />
    <script type="text/javascript" src="scripts/range.js"></script>
    <script type="text/javascript" src="scripts/timer.js"></script>
    <script type="text/javascript" src="scripts/slider.js"></script>
    <script type="text/javascript" src="scripts/slideshow.ashx"></script>
    <script type="text/javascript" src="scripts/slideshow.js"></script>

<script>		

 function fireEvent(element,event){
            if (document.createEventObject){
                // dispatch for IE
                var evt = document.createEventObject();
                return element.fireEvent('on'+event,evt)
            }
            else{
                // dispatch for firefox + others
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true ); // event type,bubbling,cancelable
                return !element.dispatchEvent(evt);
            }
 } 
		function choose_image(element) {			
			image = $$(element).attr("alt");
			$$("#window_selection").css("background-image","url('"+image+"')");
			$$("#image").attr("src",image);
			$$("#download_button").attr("href",image).attr("download",image);
		}

		function quick_sort(tab, tab_temp, begin, end) {
			var left    = begin-1;
        	var right   = end+1;
        	const pivot = tab_temp[begin];

        	if (begin >= end) return;

            while(true) {            
				do right--; while(parseFloat(tab_temp[right]) > parseFloat(pivot));            
	            do left++; while(parseFloat(tab_temp[left]) < parseFloat(pivot));

	            if (left < right) {	                	            	
	                temp            = tab_temp[left];
			        tab_temp[left]  = tab_temp[right];
			        tab_temp[right] = temp;

			        temp          = tab[left][1];
			        tab[left][1]  = tab[right][1];
			        tab[right][1] = temp;
	            } else break;
	        }

	        quick_sort(tab, tab_temp, begin, right);
        	quick_sort(tab, tab_temp, right+1, end);       
		}
		
		function show_gallery(date) {						
			folder = '/'+$$('#gallery_drop_down').val();				
	    	$$.post('index.php', { situation: 1, selected_folder: folder, selected_date: date }, function(data) {				            			    		
            	images = JSON.parse(data);			            	
            	if (data != 1) {		            		
            		var image_time_temp = [];   
            		var max = images.length;       		
            		$$('.not_found').hide();
            		$$('.image_container').show();
            		$$('#gallery .small_thumbnail').remove();            				            				            	
	            	for (var i = 0; i < max; i++) {
	            	    
	            	    image_time = images[i][1].substr(images[i][1].lastIndexOf("_")+1, 4);			
	            	  
	            	    image_time = (image_time.indexOf('.', 3) !== -1)? image_time[0]+'.'+image_time[1]+image_time[2]: image_time[0]+image_time[1]+'.'+image_time[2]+image_time[3];	 	 	            	    
						image_time_temp[i] = image_time;	            	    
					};         
					
					quick_sort(images, image_time_temp, 0, image_time_temp.length-1);					

					for (var i = 0; i < max; i++) {
						image_name = images[i][1].substr(images[i][1].lastIndexOf("/")+1);		

						$$('#gallery').append('<span class="small_thumbnail" style="background-image:url(\''+images[i][1]+'\')"'
	            	    	+'title="'+image_name+'" alt="'+images[i][1]+'">'
            			    +'<span>'+image_time_temp[i]+'</span></span>');	            			            			            	    						
					}   

					$$('#gallery').show();	
					$$('.gallery_container').css('width',150*max);
					$$(".bottom_container").mCustomScrollbar({
						// autoExpandScrollbar: true,			            			            
			            theme:"dark-2",
			            // theme:"light-2",
			            axis:"yx",
			            scrollInertia:0		            
		            });												
					click_on_image();
				} else {										
					$$('#gallery .small_thumbnail').remove();							
					$$(".thumbnail,.image_container").css("background-image","none");
					$$('.gallery_container,.mCSB_container').width('100%');																		
					$$('.image_container').hide();
					$$('.not_found').show();	
					setTimeout(function() {
					    $$('.not_found').css('color','#949494').css('border-color','#949494');
					},100);						
					$$('.not_found').css('color','#3B4B59').css('border-color','#3B4B59');
				}                                                           		
            });   
		}	

		function click_on_image() {
			$$(".small_thumbnail").click(function() {				
				choose_image(this);				
			})
			$$(".small_thumbnail:eq(0)").click()

		}

		$$.fn.appendAttr = function(attrName, suffix) {
            this.attr(attrName, function(i, val) {
                return val + suffix;
            });
            return this;
        };

        function get_disabled_dates(additional_function) {
            folder = '/'+$$('#gallery_drop_down').val();                         
            date = year+'-'+((month < 10)? '0'+month: month);                                    
            var disabled_dates = [];
            $$.post('index.php', { situation: 2, selected_folder: folder, current_date: date }, function(data) { 
            setTimeout(function(){
            	
                days = JSON.parse(data);                                            
                if (days[0] != -1) {
                    for (var day = 1; day <= 31; day++) {                        
                        $$("a:contains('"+day+"')").parent().removeAttr('onClick');
                        if (days[day] == 0) {                                                                                                                                                        
                            $$("a:contains('"+day+"')").each(function() {
                                if ($$(this).text() == day) {                                                          
                                    $$(this).parent().appendAttr('class', ' ui-state-disabled');                                    
                                }                                  
                            });                                 
                        } else if (days[day] == 1) {                                       
                            $$("a:contains('"+day+"')").each(function() {
                                if ($$(this).text() == day) {                                    
                                    $$(this).parent().attr('onClick', 'get_clicked_date(this, date);');                                    
                                }                                  
                            });     
                        }
                    }                
                } else {                
                    for (var day = 1; day <= 9; day++) {                                                                                                        
                        $$("a:contains('"+day+"')").parent().removeAttr('onClick').appendAttr('class', ' ui-state-disabled');                            
                    }
                }   
                if(additional_function)
                	additional_function()         
            },300)                                                 
            });                
        }

        function get_clicked_date(element, date) {            
            var jour=$$(element).find("a").text();             
            show_gallery(date+'-'+((jour < 10)? '0'+jour: jour));
        }    

        function hide_days(name) {
            if (name === "next" && next_enabled) {              
                (month >= 12)? (month = 1, year++): month++;                   
                get_disabled_dates();
                next_enabled--;                                         
            } else if (name === "prev") {               
                (month <= 1)? (month = 12, year--): month--;                
                get_disabled_dates();
                next_enabled++;                             
            }           
          
            $$('.ui-datepicker-next').bind("mousedown",function(){hide_days("next");});
            $$('.ui-datepicker-prev').bind("mousedown",function(){hide_days("prev");});
        }

        function init_calender() {
            $$("#calendar_field").datepicker({
                dateFormat: "yy-mm-dd",
                maxDate: '0',                                                            
            });
            
            month = $$('#calendar_field').datepicker("getDate").getMonth()+1;
            year  = $$('#calendar_field').datepicker("getDate").getFullYear();
            next_enabled = 0;    

            get_disabled_dates(function(){
            	$$(".ui-datepicker-current-day").click()
            });
            
           
            $$('.ui-datepicker-next').live("mousedown",function(){hide_days("next");});
            $$('.ui-datepicker-prev').live("mousedown",function(){hide_days("prev");});
        }
		
		var month, year, next_enabled; 

		$(document).ready(function() {	

			init_calender();
window_right=$$("#window_selection").offset().left + $$("#window_selection").outerWidth()
window_bottom=$$("#window_selection").offset().top + $$("#window_selection").height()
			$$("#gallery_drop_down").change(function() {	             	            
				date = $$("#calendar_field").datepicker().val();	            			
				if (date != '') {									
					show_gallery(date);						
					$$("#calendar_field").empty(); 
                    $$("#calendar_field").removeAttr('class');
                    init_calender();         				
				}			
			});			
			click_on_image();	
		});		
	</script>
</head> 
<body onload="Initialize()" onresize="Resize()" style="background-image: none">
	<div class="container">
		<div class="top_container">
			<div class="left_container">
				<?php 
					$results = scandir("target");
				?>
				<select name="gallery" id="gallery_drop_down" autocomplete="off">					
					<?php						 
						foreach ($results as $result) {								   
						    if ($result === '.' || $result === '..') continue;						    	   
						    if (is_dir("target/".$result)) {						    	
						        echo '<option value="'.$result.'">'.$result.'</option>';
						    } 
						}
					?>
				</select>
				<div class="clear"></div>
				<!-- <input type="text" id="calendar_field" /> -->
				<div id="calendar_field"></div>
				<div class="clear"></div>
				<!-- <div class="thumbnail">					
					<div class="not_found" id="not_found1">No images found for this day</div>
				</div> -->

		<div class="sep-line" id="separator" style="display: none"></div>
    <div id="_debug" style="overflow: scroll; height: 500px; position: absolute; z-index: 10; width: 200px; background-color: #fff; right: 0px; top: 0px; display: none"></div>
    <div class="slider-pane-hoz" id="slider_pane_hoz" style="display:none;">
        <div id="hoz_slider">
            <input id="hoz_slider_input" />
        </div>
        <input id="SliderHoz" value="100" type="hidden" />
    </div>
    <div class="slider-pane-vrt" id="slider_pane_vrt" style="display:none;">
        <div id="vrt_slider">
            <input id="vrt_slider_input" />
        </div>
        <input id="SliderVrt" value="100" type="hidden" />
    </div>
    <div id="sliderBox" style="display:none;" class="slider-box"></div>
    <div id="overlay_bg_left" class="overlay-bg-left" style="display: none; left: 232px; top: 110px;height: 19px"></div>
    <div id="overlay_bg_right" class="overlay-bg-right" style="display: none; top: 110px;height: 19px"></div>
    <div id="overlay_bg_top" class="overlay-bg-left" style="display: none; top: 110px; left: 232px;width: 18px"></div>
    <div id="overlay_bg_bottom" class="overlay-bg-right" style="display: none; left: 232px;width: 18px"></div>
    <div class="split-bg" id="splitBg" style="display: none"></div>
    <div id="loading_pane" class="loading-pane"></div>
    	
    <div class="preview_container">
    	<div class="preview" id="preview">
    		<div id="window" class="window"></div>
    		<div class="s-overlay" id="s_overlay"></div>
    		<div id="window_selection" class="window-selection" style="background-size:cover">
    			<div id="selection" class="selection"></div>
    		</div>
    		<div class="slider-pane-loading" id="slider_loading"></div>
    		<div class="slider-pane" id="slider">
    			<div id="red_slider">
    				<input id="red_slider_input" />
    			</div>
    			<input id="Slider1" value="100" type="hidden" autocomplete=off />
    			<script src="scripts/sliderControls.js" type="text/javascript"></script>
    			<span id="lblZoom" class="zoom-label">100%</span>
    			<!-- <span id="lblZoomLabel" class="label-zoom-label">Zoom</span> -->
    		</div>
    	</div>
    	
    </div>

				<div class="buttons">
					<!-- <input type="range" class="zoom-range">
					<p>zoom</p> -->
					<div class="clear"></div>
					<a class="button" id="download_button" href="images/image(1).jpg" download="images/image(1).jpg">Download image</a>
				</div>
			</div>
			<div class="right_container">				
				<div id="layout" class="layout" style="display: none">
        <div class="main-image" id="main_panel">
            <img id="image" src="" style="width:920px;" class="image_container" alt="" />
        </div>
        <div class="main-image" id="right_panel" style="display: none">
            <img id="imageRight" style="display: none" />
        </div>
        <div id="overlay_panel" style="overflow: hidden; display: none; position: absolute; top: 110px">
            <img id="image_overlay" style="display: none" />
        </div>
        <div class="split-image-2" id="image_split_2" style="display: none">
            <img id="image2" />
        </div>
        <div class="split-image-3" id="image_split_3" style="display: none">
            <img id="image3" />
        </div>
        <div class="split-image-4" id="image_split_4" style="display: none">
            <img id="image4" />
        </div>
        <span id="lblLeftTop" style="display: none" class="left-top-button-label">Left</span>
        <span id="lblRightBottom" style="display: none" class="right-bottom-button-label">Right</span>
        <div id="lblSplit1" style="display: none" class="split-label">
            <div id="lblSplit1Contents"></div>
        </div>
        <div id="lblSplit2" style="display: none" class="split-label">
            <div id="lblSplit2Contents"></div>
        </div>
    </div>	
			</div>
		</div>
		<div class="bottom_container">
			<div id="gallery" class="gallery_container">
				<div class="not_found" id="not_found3"></div>				
			</div>			
		</div>		
	</div>
    <script type="text/javascript" src="scripts/drag.js"></script>
		<!-- // <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script> -->
<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script> -->
<!-- <script type="text/javascript" src="js/jquery.js"></script> -->
</body>
</html>
<?php } ?>