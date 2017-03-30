var xmlHttp;

debug = false;
mode = "normal";
debug_count = 0;

rh = null;
rv = null;

minHeight = 690;

overlay_ini = false;

var arrImages = new Array();
var arrImages2 = new Array();

selected_image = 1;

dtLeftTop = new Date();
dtRightBottom = new Date();

image1_index = -1;
image2_index = -1;

ads_visible = "none";

var months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

dt = new Date();

currentMonth = dt.getMonth()+1;
currentYear = dt.getFullYear();
currentDay = dt.getDate();
currentVYear = currentYear;
currentVMonth = currentMonth;

currentMonth2 = dt.getMonth()+1;
currentYear2 = dt.getFullYear();
currentDay2 = dt.getDate();
currentVYear2 = currentYear;
currentVMonth2 = currentMonth;

minMonth = currentMonth;
maxMonth = currentMonth;
minDay = currentDay;
maxDay = currentDay;
minYear = currentYear;
maxYear = currentYear;

minMonth2 = currentMonth2;
maxMonth2 = currentMonth2;
minDay2 = currentDay2;
maxDay2 = currentDay2;
minYear2 = currentYear2;
maxYear2 = currentYear2;

var selectedDate = new Date();
selectedDate.setFullYear(currentYear,currentMonth-1,currentDay);

var selectedDate2 = new Date();
selectedDate2.setFullYear(currentYear2,currentMonth2-1,currentDay2);

var left_ = 0;
var top_ = 0;


function SelectImage(img)
{
showDebug("SelectImage: " + img);

if(img == 1 && selected_image == 2)
{
selected_image = 1;

document.getElementById("btnLeftTop").style.borderColor = "#fff";
document.getElementById("btnRightBottom").style.borderColor = "#354351";
document.getElementById("btnLeftTop").style.color = "#fff";
document.getElementById("btnRightBottom").style.color = "#3A4856";

document.getElementById("lblLeftTop").style.color = "#fff";
document.getElementById("lblRightBottom").style.color = "#3A4856";

currentDay = dtLeftTop.getDate();
currentMonth = dtLeftTop.getMonth()+1;
currentYear = dtLeftTop.getFullYear();

selectedDate = dtLeftTop;
LoadCalendar(true);
//SDate(currentYear, currentMonth, currentDay);

//time = arrImages[image1_index]["time"];
//document.getElementById("lblSTime").innerHTML = time;
//UpdateNavButtons(image1_index);

} // end if
else if(img == 2 && selected_image == 1)
{
selected_image = 2;

document.getElementById("btnRightBottom").style.borderColor = "#fff";
document.getElementById("btnLeftTop").style.borderColor = "#354351";
document.getElementById("btnRightBottom").style.color = "#fff";
document.getElementById("btnLeftTop").style.color = "#3A4856";

document.getElementById("lblLeftTop").style.color = "#3A4856";
document.getElementById("lblRightBottom").style.color = "#fff";

currentDay = dtRightBottom.getDate();
currentMonth = dtRightBottom.getMonth()+1;
currentYear = dtRightBottom.getFullYear();

selectedDate = dtRightBottom;
LoadCalendar(true);
//SDate(currentYear, currentMonth, currentDay);

//time = arrImages[image2_index]["time"];
//document.getElementById("lblSTime").innerHTML = time;
//UpdateNavButtons(image2_index);

} // end if

//alert("UpdateNav in select image");
UpdateNav();

} // end function SelectImage

function UpdateCalendar(imageno)
{
if(imageno == 2)
{
UpdateCalendar2();
return;

} // end if

showDebug("UpdateCalendar");

currentMonth = parseInt(currentMonth);
currentYear = parseInt(currentYear);

prevMonth = currentMonth;
prevYear = currentYear;
nextMonth = currentMonth;
nextYear = currentYear;

if(currentMonth > 1)
prevMonth -= 1;
else
{
prevYear -= 1;
prevMonth = 12;
}

if(currentMonth < 12)
nextMonth += 1;
else
{
nextMonth = 1;
nextYear += 1;
}

var minDate = new Date();
minDate.setFullYear(minYear,minMonth,1);

var maxDate = new Date();
maxDate.setFullYear(maxYear,maxMonth,1);

var prevDate = new Date();
prevDate.setFullYear(prevYear,prevMonth,1);

var nextDate = new Date();
nextDate.setFullYear(nextYear,nextMonth,1);

if(prevDate>=minDate)
{
document.getElementById("lnkPrevMonth").style.display = "";
document.getElementById("lnkPrevVMonth").style.display = "";

} // end if
else
{
document.getElementById("lnkPrevMonth").style.display = "none";
document.getElementById("lnkPrevVMonth").style.display = "none";

} // end else

if(nextDate<=maxDate)
{
document.getElementById("lnkNextMonth").style.display = "";
document.getElementById("lnkNextVMonth").style.display = "";

} // end if
else
{
document.getElementById("lnkNextMonth").style.display = "none";
document.getElementById("lnkNextVMonth").style.display = "none";

} // end else

} // function UpdateCalendar

function UpdateCalendar2()
{
currentMonth2 = parseInt(currentMonth2);
currentYear2 = parseInt(currentYear2);

prevMonth2 = currentMonth2;
prevYear2 = currentYear2;
nextMonth2 = currentMonth2;
nextYear2 = currentYear2;

if(currentMonth2 > 1)
prevMonth2 -= 1;
else
{
prevYear2 -= 1;
prevMonth2 = 12;
}

if(currentMonth2 < 12)
nextMonth2 += 1;
else
{
nextMonth2 = 1;
nextYear2 += 1;
}

var minDate = new Date();
minDate.setFullYear(minYear2,minMonth2,1);

var maxDate = new Date();
maxDate.setFullYear(maxYear2,maxMonth2,1);

var prevDate = new Date();
prevDate.setFullYear(prevYear2,prevMonth2,1);

var nextDate = new Date();
nextDate.setFullYear(nextYear2,nextMonth2,1);

if(prevDate>=minDate)
document.getElementById("lnkPrevMonth2").style.display = "";
else
document.getElementById("lnkPrevMonth2").style.display = "none";

if(nextDate<=maxDate)
document.getElementById("lnkNextMonth2").style.display = "";
else
document.getElementById("lnkNextMonth2").style.display = "none";

} // function UpdateCalendar2

function PrevMonth(imageno)
{
if(imageno==2)
{
currentMonth2 = parseInt(currentMonth2);
currentYear2 = parseInt(currentYear2);

if(currentMonth2 > 1)
currentMonth2 -= 1;
else
{
currentYear2 -= 1;
currentMonth2 = 12;
}

document.getElementById("lblMonth2").innerHTML = months[currentMonth2-1]+" "+currentYear2;

} // end if
else
{
imageno = 1;
currentMonth = parseInt(currentMonth);
currentYear = parseInt(currentYear);

if(currentMonth > 1)
currentMonth -= 1;
else
{
currentYear -= 1;
currentMonth = 12;
}

document.getElementById("lblMonth").innerHTML = months[currentMonth-1]+" "+currentYear;

} // end else

LoadCalendar(false, imageno);

} // end function PrevMonth

function NextMonth(imageno)
{
if(imageno==2)
{
currentMonth2 = parseInt(currentMonth2);
currentYear2 = parseInt(currentYear2);

if(currentMonth2 < 12)
currentMonth2 += 1;
else
{
currentMonth2 = 1;
currentYear2 += 1;
}

document.getElementById("lblMonth2").innerHTML = months[currentMonth2-1]+" "+currentYear2;

} // end if
else
{
imageno = 1;
currentMonth = parseInt(currentMonth);
currentYear = parseInt(currentYear);

if(currentMonth < 12)
currentMonth += 1;
else
{
currentMonth = 1;
currentYear += 1;
}

document.getElementById("lblMonth").innerHTML = months[currentMonth-1]+" "+currentYear;

} // end else

LoadCalendar(false, imageno);

} // end function NextMonth

function PrevVMonth(image_no)
{
if(image_no == 1)
{
currentVMonth = parseInt(currentVMonth);
currentVYear = parseInt(currentVYear);

if(currentVMonth > 1)
currentVMonth -= 1;
else
{
currentVYear -= 1;
currentVMonth = 12;

} // end else

} // end if
else if(image_no == 2)
{
currentVMonth2 = parseInt(currentVMonth2);
currentVYear2 = parseInt(currentVYear2);

if(currentVMonth2 > 1)
currentVMonth2 -= 1;
else
{
currentVYear2 -= 1;
currentVMonth2 = 12;

} // end else

} // end if

PrevMonth(image_no);
LoadVCalendar(image_no);

} // end function PrevMonth

function NextVMonth(image_no)
{
if(image_no == 1)
{
currentMonth = parseInt(currentVMonth);
currentYear = parseInt(currentVYear);

if(currentVMonth < 12)
currentVMonth += 1;
else
{
currentVMonth = 1;
currentVYear += 1;

} // end else

} // end if
else if(image_no == 2)
{
currentMonth2 = parseInt(currentVMonth);
currentYear2 = parseInt(currentVYear);

if(currentVMonth2 < 12)
currentVMonth2 += 1;
else
{
currentVMonth2 = 1;
currentVYear2 += 1;

} // end else

} // end if

LoadVCalendar(image_no);
NextMonth(image_no);

} // end function NextMonth

function LoadTLapse(propertyid)
{
    document.getElementById("overlay").style.display = "";
    document.getElementById("pnlAds").style.display = "none";

xmlHttp = GetXmlHttpObject();

if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==1)
{
document.getElementById("tLapsePane").style.display = "";
document.getElementById("tLapseFlash").innerHTML = "<img style=\"margin-top: 80px\" src=\"/images/indicator.gif\" alt=\"Loading\" />";

} // end if
else if(xmlHttp.readyState==4)
{
document.getElementById("tLapseFlash").innerHTML = xmlHttp.responseText;

document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";

} // end if
}

xmlHttp.open("GET.html","/getTLapse.ashx?id="+propertyid,true);
xmlHttp.send(null);

} // end function LoadTLapse

function LoadAerial(propertyid) {
    xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;

    } // end if
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 1) {
        } // end if
        else if (xmlHttp.readyState == 4) {
            document.getElementById("dropAerial").innerHTML = replaceAll('#W#', '1',xmlHttp.responseText);
            document.getElementById("dropAerial2").innerHTML = replaceAll('#W#', '2',xmlHttp.responseText.replace('dropdown-aerial', 'dropdown-aerial2'));
            document.getElementById("btnNormalScreen").style.display = "";
            document.getElementById("btnFullScreen").style.display = "none";
        } // end if
    }

    xmlHttp.open("GET.html", "/aerial.ashx?id=" + propertyid, true);
    xmlHttp.send(null);

} // end function LoadTLapse

function ShowAerial(which,propertyid,file)
{
    if (which == 1) {
        document.getElementById("imgLoading").style.display = "none";
        document.getElementById("image").style.display = "";
        document.getElementById("image").src = "/images/" + propertyid + "/aerial/" + file;
        document.getElementById("selection").style.backgroundImage = "url(/thumb.ashx?file=/images/" + propertyid + "/aerial/" + file + ")";
        document.getElementById("window").style.backgroundImage = "url(/thumb.ashx?file=/images/" + propertyid + "/aerial/" + file + ")";
    }
    else {
        
        document.getElementById("imgLoadingRight").style.display = "none";
        document.getElementById("imageRight").style.display = "";
        document.getElementById("imageRight").src = "/images/" + propertyid + "/aerial/" + file;

    }

}

function LoadVCalendar_Click()
{
    document.getElementById("overlay").style.display = "";
    document.getElementById("pnlAds").style.display = "none";

LoadVCalendar(1);

} // end function LoadVCalendar

function LoadVCalendar2_Click()
{
    document.getElementById("overlay").style.display = "";
    document.getElementById("pnlAds").style.display = "none";

LoadVCalendar(2);

} // end function LoadVCalendar

function LoadVCalendar(image_no)
{
if(image_no == 1)
{
currentVMonth = currentMonth;
currentVYear = currentYear;
document.getElementById("lnkPrevVMonth").href = "javascript:PrevVMonth(1)";
document.getElementById("lnkNextVMonth").href = "javascript:NextVMonth(1)";
document.getElementById("lblVMonth").innerHTML = months[currentVMonth-1]+" "+currentVYear;
propertyid = document.getElementById("hidPropertyId").value;

document.getElementById("lnkPrevVMonth").style.display
= document.getElementById("lnkPrevMonth").style.display;

document.getElementById("lnkNextVMonth").style.display
= document.getElementById("lnkNextMonth").style.display;

} // end if
else if(image_no == 2)
{
currentVMonth2 = currentMonth2;
currentVYear2 = currentYear2;
document.getElementById("lnkPrevVMonth").href = "javascript:PrevVMonth(2)";
document.getElementById("lnkNextVMonth").href = "javascript:NextVMonth(2)";
document.getElementById("lblVMonth").innerHTML = months[currentVMonth2-1]+" "+currentVYear2;
propertyid = document.getElementById("hidPropertyId2").value;

document.getElementById("lnkPrevVMonth").style.display
= document.getElementById("lnkPrevMonth2").style.display;

document.getElementById("lnkNextVMonth").style.display
= document.getElementById("lnkNextMonth2").style.display;

} // end if

xmlHttp = GetXmlHttpObject();

if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==1)
{
document.getElementById("vCalendar").style.display = "";
document.getElementById("vCalDetails").innerHTML = "<img style=\"margin-top: 233px\" src=\"/images/indicator.gif\" alt=\"Loading\" />";

} // end if
else if(xmlHttp.readyState==4)
{
document.getElementById("vCalDetails").innerHTML = xmlHttp.responseText;

} // end if
}

if(image_no==1)
xmlHttp.open("GET.html","/getCalendar.ashx?id="+propertyid+"&m="+currentVMonth+"&y="+currentVYear+"&q=v&imgno="+image_no,true);
else if(image_no==2)
xmlHttp.open("GET.html","/getCalendar.ashx?id="+propertyid+"&m="+currentVMonth2+"&y="+currentVYear2+"&q=v&imgno="+image_no,true);

xmlHttp.send(null);

} // end function LoadVCalendar

function CloseVCalendar()
{
document.getElementById("vCalendar").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";

} // end function CloseVCalendar

function CloseEmail()
{
document.getElementById("pnlEmail").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";

} // end function CloseEmail

function ClosePassword()
{
document.getElementById("pnlPassword").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";
document.getElementById("frmPassword").src = "password.html";

} // end function ClosePassword

function CloseHelpEmail()
{
document.getElementById("pnlHelpEmail").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";

} // end function CloseHelpEmail

function CloseHelp()
{
document.getElementById("pnlHelp").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";

} // end function CloseHelp

function CloseDashboard()
{
document.getElementById("dashboard").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";

} // end function CloseDashboard

function CloseTLapse()
{
document.getElementById("tLapsePane").style.display = "none";
document.getElementById("overlay").style.display = "none";
document.getElementById("pnlAds").style.display = "";
document.getElementById("tLapseFlash").innerHTML = "";

} // end function CloseTLapse

function LoadCalendar(select, image_no)
{
if(image_no!=2)
image_no = 1;

showDebug("LoadCalendar: "+select);

UpdateCalendar(image_no);
xmlHttp2 = GetXmlHttpObject();

if (xmlHttp2==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp2.onreadystatechange=function()
{
if(xmlHttp2.readyState==4)
{
if(image_no == 2)
document.getElementById("calendarPanel2").innerHTML = xmlHttp2.responseText;
else
document.getElementById("calendarPanel").innerHTML = xmlHttp2.responseText;

if(select)
SDate(currentYear, currentMonth, currentDay, image_no);

UpdateCalendarButtons(image_no);

} // end if
else if(xmlHttp2.readyState==1)
{
if(image_no == 2)
document.getElementById("calendarPanel2").innerHTML = "<img style=\"margin-top: 60px\" src=\"/images/indicator.gif\" alt=\"Loading\" />";
else
document.getElementById("calendarPanel").innerHTML = "<img style=\"margin-top: 60px\" src=\"/images/indicator.gif\" alt=\"Loading\" />";

} // end else if
}

if(image_no == 2)
{
propertyid = document.getElementById("hidPropertyId2").value;
xmlHttp2.open("GET.html","/getCalendar.ashx?id="+propertyid+"&m="+currentMonth2+"&y="+currentYear2+"&imgno="+image_no,true);

} // end if
else
{
propertyid = document.getElementById("hidPropertyId").value;
xmlHttp2.open("GET.html","/getCalendar.ashx?id="+propertyid+"&m="+currentMonth+"&y="+currentYear+"&imgno="+image_no,true);

} // end else

xmlHttp2.send(null);

} // end function LoadCalendar

function calHV(id, image_no)
{
if(document.getElementById("tdCal_"+image_no+"_"+id).className=="active")
{
document.getElementById("tdCal_"+image_no+"_"+id).className = "active-hover";
document.getElementById("tdCal_"+image_no+"_"+id).style.borderColor = "#fff";
}

} // end function calHV

function calOut(id, image_no)
{
if(document.getElementById("tdCal_"+image_no+"_"+id).className=="active-hover")
{
document.getElementById("tdCal_"+image_no+"_"+id).className = "active";
document.getElementById("tdCal_"+image_no+"_"+id).style.borderColor = "";
}

} // end function calOut

function btnHover(id,className)
{
document.getElementById(id).className = className+"-hover btn";
}

function btnOut(id, className)
{
document.getElementById(id).className = className + " btn";
}

function btnLHover(id,className)
{
document.getElementById(id).className = className+"-hover left-btn-hover";
}

function btnLOut(id, className)
{
document.getElementById(id).className = className + " left-btn";
}

function UpdateCalendarButtons(image_no)
{
showDebug("UpdateCalendarButtons");

for(i=1;i<=31;i++)
{
if(document.getElementById("tdCal_"+image_no+"_"+i)!=null)
{
if(document.getElementById("tdCal_"+image_no+"_"+i).className == "active-selected")
{
document.getElementById("tdCal_"+image_no+"_"+i).className = "active";
document.getElementById("tdCal_"+image_no+"_"+i).style.borderColor = "";

} // end if

} // end if

} // end for

if(image_no == 2)
{
if(selectedDate2.getMonth()+1==currentMonth2)
{
document.getElementById("tdCal_"+image_no+"_"+currentDay2).className = "active-selected";
document.getElementById("tdCal_"+image_no+"_"+currentDay2).style.borderColor = "#fff";

} // end if

} // end if
else
{
if(selectedDate.getMonth()+1==currentMonth)
{
document.getElementById("tdCal_"+image_no+"_"+currentDay).className = "active-selected";
document.getElementById("tdCal_"+image_no+"_"+currentDay).style.borderColor = "#fff";

} // end if

} // end else

} // end function UpdateCalendarButtons()

function SDate(year, month, day, image_no)
{
showDebug("SDate: "+day+"/"+month+"/"+year);

//alert(day + " - " + month + " - " + year + " - " + image_no);

if(image_no==2)
{
currentMonth2 = month;
currentYear2 = year;
currentDay2 = day;

document.getElementById("lblMonth2").innerHTML = months[currentMonth2-1]+" "+currentYear2;
selectedDate2.setFullYear(year,month-1,day);

if(currentMonth2!=month || currentYear2!=year)
LoadCalendar(false, image_no);
else
UpdateCalendarButtons(image_no);

} // end if
else
{
currentMonth = month;
currentYear = year;
currentDay = day;

document.getElementById("lblMonth").innerHTML = months[currentMonth-1]+" "+currentYear;
selectedDate.setFullYear(year,month-1,day);

if(currentMonth!=month || currentYear!=year)
LoadCalendar(false, image_no);
else
UpdateCalendarButtons(image_no);

} // end if

document.getElementById("vCalendar").style.display = "none";

xmlHttpSD = GetXmlHttpObject();

if (xmlHttpSD==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttpSD.onreadystatechange=function()
{
if(xmlHttpSD.readyState==4)
{
var xmlDoc=xmlHttpSD.responseXML.documentElement;

if(image_no == 1)
SDateLoad(xmlDoc);
else if(image_no == 2)
SDateLoad2(xmlDoc);

UpdateNav(image_no);
CloseOverlay();

if(mode=="week")
LoadWeek();
if(mode=="month")
LoadMonth();
if(mode=="day")
LoadDay();

} // end if
else if(xmlHttpSD.readyState==1)
{
if(image_no == 1)
{
document.getElementById("dayPanel").innerHTML = "<img src=\"/images/indicator.gif\" alt=\"Loading\" />";
document.getElementById("image").style.display = "none";
document.getElementById("imgLoading").style.display = "";

} // end if
else if(image_no == 2)
{
document.getElementById("dayPanel2").innerHTML = "<img src=\"/images/indicator.gif\" alt=\"Loading\" />";
document.getElementById("imageRight").style.display = "none";
document.getElementById("imgLoadingRight").style.display = "";

} // end if

} // end else

} // end function

// alert("/getImages.ashx?id="+propertyid+"&y="+year+"&m="+month+"&d="+day);
if(image_no == 1)
propertyid = document.getElementById("hidPropertyId").value;
else
propertyid = document.getElementById("hidPropertyId2").value;

xmlHttpSD.open("GET.html","/getImages.ashx?id="+propertyid+"&y="+year+"&m="+month+"&d="+day,true);
xmlHttpSD.send(null);

} // end function SDate

function SDateLoad(xmlDoc)
{
arrImages = new Array();

for(i=0;i<xmlDoc.getElementsByTagName("image").length;i++)
{
code = xmlDoc.getElementsByTagName("guid")[i].childNodes[0].nodeValue;
time = xmlDoc.getElementsByTagName("time")[i].childNodes[0].nodeValue;

arrImages[i] = new Array();
arrImages[i]["time"] = time;
arrImages[i]["img"] = code;

if(mode=="overlay-h" || mode=="overlay-v")
{
if(selected_image == 1)
{
if(image1_index==-1 && i==xmlDoc.getElementsByTagName("image").length-1)
{
document.getElementById("btnLeftTopContents").innerHTML = currentDay+"/"+currentMonth+"/"+currentYear+" - "+time;
document.getElementById("lblSTime").innerHTML = time;
image1_index = i;
}

if(i==image1_index)
{
document.getElementById("btnLeftTopContents").innerHTML = currentDay+"/"+currentMonth+"/"+currentYear+" - "+time;
document.getElementById("lblSTime").innerHTML = time;
}

} // end if
else if(selected_image == 2)
{
if(image2_index==-1 && i==xmlDoc.getElementsByTagName("image").length-1)
{
document.getElementById("btnRightBottomContents").innerHTML = currentDay+"/"+currentMonth+"/"+currentYear+" - "+time;
document.getElementById("lblSTime").innerHTML = time;
image2_index = i;
}

if(i==image2_index)
{
document.getElementById("btnRightBottomContents").innerHTML = currentDay+"/"+currentMonth+"/"+currentYear+" - "+time;
document.getElementById("lblSTime").innerHTML = time;
}

} // end if

} // end if
else
{
if(mode=="normal" && image1_index !=-1 && i==image1_index)
{
document.getElementById("lblSTime").innerHTML = time;
image1_index = -1;
}
else
{
if(i==xmlDoc.getElementsByTagName("image").length-1)
document.getElementById("lblSTime").innerHTML = time;

} // end else

} // end else

} // end for

} // end function SDateLoad

function SDateLoad2(xmlDoc)
{
arrImages2 = new Array();

for(i=0;i<xmlDoc.getElementsByTagName("image").length;i++)
{
code = xmlDoc.getElementsByTagName("guid")[i].childNodes[0].nodeValue;
time = xmlDoc.getElementsByTagName("time")[i].childNodes[0].nodeValue;

arrImages2[i] = new Array();
arrImages2[i]["time"] = time;
arrImages2[i]["img"] = code;

if(i==xmlDoc.getElementsByTagName("image").length-1)
document.getElementById("lblSTime2").innerHTML = time;

} // end for

} // end function SDateLoad2

function UpdateNav(image_no)
{
if(image_no==2)
{
UpdateNav2();
return;

} // end if

showDebug("UpdateNav: images count ="+arrImages.length);

navStr = "<select id=\"ddlTime\" onchange=\"UpdateImage(-1, 1)\">";
navStr2 = "<div class=\"dropdown dropdown-tip dropdown-scroll\" id=\"dropdown-1\" style=\"display: none;\"><ul class=\"dropdown-menu\">";

propertyid = document.getElementById("hidPropertyId").value;

showDebug("selected_image: "+selected_image);
showDebug("image1_index: "+image1_index);
showDebug("image2_index: "+image2_index);

//alert("arrImages.length: "+arrImages.length + " selected image: " + selected_image);
//alert("image1_index: " + image1_index + " - image2_index: " + image2_index);

//alert(image1_index + " & " + image2_index);

for(i=0;i<arrImages.length;i++) {

    //navStr2 += "<li><a href=\"" + arrImages[i]["guid"] + "\">";
    navStr2 += "<li><a onclick=\"UpdateDrop(" + i + ", 1)\" href=\"#\">";

if(mode=="overlay-h" || mode=="overlay-v")
{
if(selected_image == 1)
{
//alert("image1_index: " + image1_index + " | i: "+ i);

if(parseInt(image1_index) == parseInt(i))
{
navStr += "<option value=\""+arrImages[i]["guid"]+"\" selected=\"true\">";
UpdateImage(i, image_no);
}
else
navStr += "<option value=\""+arrImages[i]["guid"]+"\">";

} // end if
else if(selected_image == 2)
{
//alert("image2_index: " + image2_index + " | i: "+ i);

if(parseInt(image2_index) == parseInt(i))
{
navStr += "<option value=\""+arrImages[i]["guid"]+"\" selected=\"true\">";
UpdateImage(i, image_no);
}
else
navStr += "<option value=\""+arrImages[i]["guid"]+"\">";

} // end else if

} // end if
else
{
if(parseInt(i)==arrImages.length-1)
{
UpdateImage(i, image_no);
navStr += "<option value=\""+arrImages[i]["guid"]+"\" selected=\"true\">";
}
else
navStr += "<option value=\""+arrImages[i]["guid"]+"\">";

} // end else

navStr += arrImages[i]["time"] + "</option>";
navStr2 += arrImages[i]["time"] + "</a></li>";

showDebug(arrImages[i]["time"]);

} // end for

navStr += "</select>";
navStr2 += "</ul></div>";

document.getElementById("dayPanel").innerHTML = navStr;
document.getElementById("drops1").innerHTML = navStr2;
//alert(navStr);

} // end function UpdateNav

function UpdateNav2()
{
showDebug("UpdateNav: images count ="+arrImages.length);

navStr = "<select id=\"ddlTime2\" onchange=\"UpdateImage(-1, 2)\">";
navStr2 = "<div class=\"dropdown dropdown-tip dropdown-scroll\" id=\"dropdown-2\" style=\"display: none;\"><ul class=\"dropdown-menu\">";

propertyid = document.getElementById("hidPropertyId2").value;

for(i=0;i<arrImages2.length;i++) {

    navStr2 += "<li><a onclick=\"UpdateDrop(" + i + ", 2)\" href=\"#\">";

if(i==arrImages2.length-1)
{
UpdateImage(i, 2); // 2 = image no
navStr += "<option value=\""+arrImages2[i]["guid"]+"\" selected=\"true\">";
}
else
navStr += "<option value=\""+arrImages2[i]["guid"]+"\">";

navStr += arrImages2[i]["time"];
navStr += "</option>";

navStr2 += arrImages2[i]["time"];
navStr2 += "</a></li>";

} // end for

navStr += "</select>";
navStr2 += "</ul></div>";

document.getElementById("dayPanel2").innerHTML = navStr;
document.getElementById("drops2").innerHTML = navStr2;

} // end function UpdateNav2

function First()
{
index = 0;

if(mode=="overlay-h" || mode=="overlay-v")
{
if(selected_image == 1)
image1_index = 0;
else
image2_index = 0;

} // end if

UpdateImage(index);
document.getElementById("ddlTime").selectedIndex = index;

} // end function First

function Last()
{
index = arrImages.length-1;

if(mode=="overlay-h" || mode=="overlay-v")
{
if(selected_image == 1)
image1_index = index;
else
image2_index = index;

} // end if

UpdateImage(index);
document.getElementById("ddlTime").selectedIndex = index;

} // end function Last

function Next(imageno)
{
if(imageno==2)
{
index = document.getElementById("ddlTime2").selectedIndex+1;
UpdateImage(index, 2);
document.getElementById("ddlTime2").selectedIndex = index;

} // end if
else
{
if(mode=="overlay-h" || mode=="overlay-v")
{
if(selected_image == 1)
{
index = image1_index+1;
image1_index = index;

} // end if

if(selected_image == 2)
{
index = image2_index+1;
image2_index = index;

} // end if

} // end if
else
index = document.getElementById("ddlTime").selectedIndex+1;


UpdateImage(index);
document.getElementById("ddlTime").selectedIndex = index;

} // end else

} // end function Next

function Prev(imageno)
{
if(imageno==2)
{
index = document.getElementById("ddlTime2").selectedIndex-1;
UpdateImage(index, 2);
document.getElementById("ddlTime2").selectedIndex = index;

} // end if
else
{
showDebug("arrImages.length: "+arrImages.length);
showDebug("selected_image: "+selected_image);
showDebug("image1_index: "+image1_index);
showDebug("image2_index: "+image2_index);

if(mode=="overlay-h" || mode=="overlay-v")
{
if(selected_image == 1)
{
index = image1_index-1;
image1_index = index;

} // end if

if(selected_image == 2)
{
index = image2_index-1;
image2_index = index;

} // end if

} // end if
else
index = document.getElementById("ddlTime").selectedIndex-1;

UpdateImage(index);
document.getElementById("ddlTime").selectedIndex = index;

} // end else

} // end function Prev

function UpdateDrop(index, imageno) {

    if (imageno == 1) {

        document.getElementById("ddlTime").selectedIndex = index;
    }

    if (imageno == 2) {

        document.getElementById("ddlTime2").selectedIndex = index;
    }

    UpdateImage(-1, imageno);

}

function UpdateImage(index, imageno)
{
showDebug("UpdateImage: "+index);

if(imageno==2)
{
propertyid = document.getElementById("hidPropertyId2").value;

if(index == -1)
{
index = document.getElementById("ddlTime2").selectedIndex;
}

time = arrImages2[index]["time"];
document.getElementById("lblSTime2").innerHTML = time;
document.getElementById("txtMessage").value = currentDay + "/" + currentMonth + "/" + currentYear + " - " + time;

document.getElementById("lblSplit2Contents").innerHTML = currentDay2 + "/" + currentMonth2 + "/" + currentYear2 + " - " + time;

document.getElementById("imgLoadingRight").style.display = "none";
document.getElementById("imageRight").style.display = "";

} // end if
else
{
propertyid = document.getElementById("hidPropertyId").value;

if(index == -1)
{
index = document.getElementById("ddlTime").selectedIndex;
}

time = arrImages[index]["time"];
document.getElementById("lblSTime").innerHTML = time;
document.getElementById("txtMessage").value = currentDay + "/" + currentMonth + "/" + currentYear + " - " + time;
document.getElementById("btnCurrentContents").innerHTML = currentDay + "/" + currentMonth + "/" + currentYear + " - " + time;
document.getElementById("lblSplit1Contents").innerHTML = currentDay + "/" + currentMonth + "/" + currentYear + " - " + time;

document.getElementById("imgLoading").style.display = "none";
document.getElementById("image").style.display = "";

} // end else

if(mode=="overlay-h" || mode=="overlay-v")
{
showDebug("UpdateImage: mode="+mode);

if(selected_image == 1)
{
image1_index = index;
document.getElementById("image").src = "/image.ashx?id="+propertyid+"&code="+arrImages[index]["img"];
document.getElementById("btnLeftTopContents").innerHTML = currentDay+"/"+currentMonth+"/"+currentYear+" - "+time;

} // end if
else if(selected_image == 2)
{
image2_index = index;
document.getElementById("image_overlay").src = "/image.ashx?id="+propertyid+"&code="+arrImages[index]["img"];
document.getElementById("btnRightBottomContents").innerHTML = currentDay+"/"+currentMonth+"/"+currentYear+" - "+time;

} // end else if

} // end if
else
{
if(imageno==2)
document.getElementById("imageRight").src = "/image.ashx?id="+propertyid+"&code="+arrImages2[index]["img"];
else
document.getElementById("image").src = "/image.ashx?id="+propertyid+"&code="+arrImages[index]["img"];

} // end else

if(imageno==2)
{
//document.getElementById("selection_image").style.backgroundImage = "url(/thumb.ashx?id="+propertyid+"&code="+arrImages2[index]["img"]+")";
document.getElementById("selection").style.backgroundImage = "url(/thumb.ashx?id="+propertyid+"&code="+arrImages2[index]["img"]+")";
document.getElementById("window").style.backgroundImage = "url(/thumb.ashx?id="+propertyid+"&code="+arrImages2[index]["img"]+")";

} // end if
else
{
// document.getElementById("selection_image").style.backgroundImage = "url(/thumb.ashx?id="+propertyid+"&code="+arrImages[index]["img"]+")";
document.getElementById("selection").style.backgroundImage = "url(/thumb.ashx?id="+propertyid+"&code="+arrImages[index]["img"]+")";
document.getElementById("window").style.backgroundImage = "url(/thumb.ashx?id="+propertyid+"&code="+arrImages[index]["img"]+")";

} // end else

UpdateNavButtons(index, imageno);

} // end function UpdateImage

function UpdateNavButtons(index, imageno)
{
if(imageno ==2)
{
UpdateNavButtons2(index);
return;

} // end if

showDebug("UpdateNavButtons: "+index);

document.getElementById("btnFirst").className = "first btn";
document.getElementById("btnLast").className = "last btn";
document.getElementById("btnPrev").className = "prev btn";
document.getElementById("btnNext").className = "next btn";

if(arrImages.length > 1)
{
if(index == 0)
{
document.getElementById("btnFirst").disabled = true;
document.getElementById("btnLast").disabled = false;
document.getElementById("btnPrev").disabled = true;
document.getElementById("btnNext").disabled = false;

if(mode=="full")
{
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "none";

} // end if
else
{
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "";

} // end else

} // end if
else if(index > 0 && index < arrImages.length-1)
{
document.getElementById("btnFirst").disabled = false;
document.getElementById("btnLast").disabled = false;
document.getElementById("btnPrev").disabled = false;
document.getElementById("btnNext").disabled = false;

if(mode=="full")
{
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "none";

} // end if
else
{
document.getElementById("btnTimePrev").style.display = "";
document.getElementById("btnTimeNext").style.display = "";

} // end else

} // end else if
else if(index == arrImages.length-1)
{
document.getElementById("btnFirst").disabled = false;
document.getElementById("btnLast").disabled = true;
document.getElementById("btnPrev").disabled = false;
document.getElementById("btnNext").disabled = true;

if(mode=="full")
{
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "none";

} // end if
else
{
document.getElementById("btnTimePrev").style.display = "";
document.getElementById("btnTimeNext").style.display = "none";

} // end else

} // end if

} // end if
else
{
document.getElementById("btnFirst").disabled = true;
document.getElementById("btnLast").disabled = true;
document.getElementById("btnPrev").disabled = true;
document.getElementById("btnNext").disabled = true;

if(mode=="full")
{
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "none";

} // end if
else
{
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "none";

} // end else

} // end else

} // end function UpdateNavButtons

function UpdateNavButtons2(index)
{
if(arrImages2.length > 1)
{
if(index == 0)
{
document.getElementById("btnTimePrev2").style.display = "none";
document.getElementById("btnTimeNext2").style.display = "";

} // end if
else if(index > 0 && index < arrImages2.length-1)
{
document.getElementById("btnTimePrev2").style.display = "";
document.getElementById("btnTimeNext2").style.display = "";

} // end else if
else if(index == arrImages2.length-1)
{
document.getElementById("btnTimePrev2").style.display = "";
document.getElementById("btnTimeNext2").style.display = "none";

} // end if

} // end if
else
{
document.getElementById("btnTimePrev2").style.display = "none";
document.getElementById("btnTimeNext2").style.display = "none";

} // end else

} // end function UpdateNavButtons2

function GetXmlHttpObject()
{
var xmlHttp=null;

try
{
// Firefox, Opera 8.0+, Safari
xmlHttp=new XMLHttpRequest();
}
catch (e)
{
// Internet Explorer
try
{
xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
}
catch (e)
{
xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
}
return xmlHttp;

} // end function GetXmlHttpObject

function LoadProperty(imageno)
{
if(imageno != 2)
imageno = 1;

if(mode != "split")
mode = "normal";

xmlHttpPr = GetXmlHttpObject();

if (xmlHttpPr==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttpPr.onreadystatechange=function()
{
if(xmlHttpPr.readyState==1)
{
if(imageno==1)
{
document.getElementById("image").style.display = "none";
document.getElementById("imgLoading").style.display = "";

} // end if
else if(imageno==2)
{
document.getElementById("imageRight").style.display = "none";
document.getElementById("imgLoadingRight").style.display = "";

} // end if
}

if(xmlHttpPr.readyState==4)
{
var xmlDoc=xmlHttpPr.responseXML.documentElement;

if(imageno == 1)
{
currentMonth = xmlDoc.getElementsByTagName("month")[0].childNodes[0].nodeValue;
currentYear = xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue;
currentDay = xmlDoc.getElementsByTagName("day")[0].childNodes[0].nodeValue;

maxMonth = xmlDoc.getElementsByTagName("month")[0].childNodes[0].nodeValue;
maxYear = xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue;
maxDay = xmlDoc.getElementsByTagName("day")[0].childNodes[0].nodeValue;

minMonth = xmlDoc.getElementsByTagName("month")[1].childNodes[0].nodeValue;
minYear = xmlDoc.getElementsByTagName("year")[1].childNodes[0].nodeValue;
minDay = xmlDoc.getElementsByTagName("day")[1].childNodes[0].nodeValue;

document.getElementById("lblMonth").innerHTML = months[currentMonth-1]+" "+currentYear;

} // end if
else if(imageno == 2)
{
currentMonth2 = xmlDoc.getElementsByTagName("month")[0].childNodes[0].nodeValue;
currentYear2 = xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue;
currentDay2 = xmlDoc.getElementsByTagName("day")[0].childNodes[0].nodeValue;

maxMonth2 = xmlDoc.getElementsByTagName("month")[0].childNodes[0].nodeValue;
maxYear2 = xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue;
maxDay2 = xmlDoc.getElementsByTagName("day")[0].childNodes[0].nodeValue;

minMonth2 = xmlDoc.getElementsByTagName("month")[1].childNodes[0].nodeValue;
minYear2 = xmlDoc.getElementsByTagName("year")[1].childNodes[0].nodeValue;
minDay2 = xmlDoc.getElementsByTagName("day")[1].childNodes[0].nodeValue;

document.getElementById("lblMonth2").innerHTML = months[currentMonth2-1]+" "+currentYear2;

} // end if

LoadCalendar(true, imageno);

} // end if

} // end function

if(imageno == 1)
{
propertyid = document.getElementById("hidPropertyId").value;
xmlHttpPr.open("GET.html","/getCalendar.ashx?id="+propertyid+"&q=ini",true);

} // end if
else if(imageno == 2)
{
propertyid = document.getElementById("hidPropertyId2").value;
xmlHttpPr.open("GET.html","/getCalendar.ashx?id="+propertyid+"&q=ini",true);

} // end if

xmlHttpPr.send(null);

} // end function LoadProperty

function LoadDay()
{
LoadNormal(false);

mode = "day";

Resize();

document.getElementById("label1").innerHTML = "Selected Image";
document.getElementById("label2").innerHTML = "1 Day Ago";
document.getElementById("label3").innerHTML = "2 Days Ago";
document.getElementById("label4").innerHTML = "3 Days Ago";

LoadImage("image2", "d", -1);
LoadImage("image3", "d", -2);
LoadImage("image4", "d", -3);

document.getElementById("nav").style.display = "none";
document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";

} // end function LoadDay()

function LoadWeek()
{
LoadNormal(false);

mode = "week";

Resize();

document.getElementById("label1").innerHTML = "Selected Image";
document.getElementById("label2").innerHTML = "1 Week Ago";
document.getElementById("label3").innerHTML = "2 Weeks Ago";
document.getElementById("label4").innerHTML = "3 Weeks Ago";

LoadImage("image2", "w", -1);
LoadImage("image3", "w", -2);
LoadImage("image4", "w", -3);

document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";
document.getElementById("nav").style.display = "none";

} // end function LoadWeek()

function LoadMonth()
{
LoadNormal(false);

mode = "month";

Resize();

LoadImage("image2", "m", -1);
LoadImage("image3", "m", -2);
LoadImage("image4", "m", -3);

document.getElementById("label1").innerHTML = "Selected Image";
document.getElementById("label2").innerHTML = "1 Month Ago";
document.getElementById("label3").innerHTML = "2 Months Ago";
document.getElementById("label4").innerHTML = "3 Months Ago";

document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";
document.getElementById("nav").style.display = "none";

} // end function LoadMonth()

function LoadImage(imageid, type, period) {
    //alert(type);
xmlHttpI = GetXmlHttpObject();

if (xmlHttpI == null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttpI.onreadystatechange = function()
{
    if (xmlHttpI.readyState == 4)
{
    img = xmlHttpI.responseText;
document.getElementById(imageid).src = "/image.ashx?id="+document.getElementById("hidPropertyId").value+"&code="+img;

} // end if
}
//alert("/getImage.ashx?id=" + document.getElementById("hidPropertyId").value + "&d=" + currentDay + "&m=" + currentMonth + "&y=" + currentYear + "&t=" + type + "&p=" + period);
xmlHttpI.open("GET.html", "/getImage.ashx?id=" + document.getElementById("hidPropertyId").value + "&d=" + currentDay + "&m=" + currentMonth + "&y=" + currentYear + "&t=" + type + "&p=" + period, false);
xmlHttpI.send(null);

} // end function LoadImage

function CloseOverlay()
{
document.getElementById("overlay").style.display = "none";
document.getElementById("property_enlarged").style.display = "none";

CloseVCalendar();
CloseEmail();
CloseTLapse();
CloseHelpEmail();
CloseHelp();
ClosePassword();
}

function CloseLoading()
{
document.getElementById("loading_pane").style.display = "none";
document.getElementById("layout").style.display = "";
document.getElementById("slider").style.display = "";
document.getElementById("slider_loading").style.display = "none";
document.body.style.backgroundImage = "";
}

function FScreen()
{
document.getElementById("banner").style.display = "none";
document.getElementById("pnlProperty").style.display = "none";
document.getElementById("imgFinal").style.display = "none";
document.getElementById("property_enlarged").style.display = "none";
document.getElementById("pnlAddress").style.display = "none";
document.getElementById("pnlClient").style.display = "none";
document.getElementById("calendarPanel").style.display = "none";
document.getElementById("calendarHeader").style.display = "none";
document.getElementById("dayPanel").style.display = "none";
document.getElementById("window").style.display = "none";
document.getElementById("s_overlay").style.display = "none";
document.getElementById("window_selection").style.display = "none";
document.getElementById("slider").style.display = "";
document.getElementById("btnDashboard").style.display = "none";
document.getElementById("btnVCalendar").style.display = "none";
document.getElementById("vCalendar").style.display = "none";
document.getElementById("btnNormalScreen").style.display = "none";
document.getElementById("btnNScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";

propertyid = document.getElementById("hidPropertyId").value;

document.getElementById("pnlAds").style.display = "none";
// "<script type=\"text/javascript\"> if(fadeimages.length>0) new fadeshow(fadeimages, 400, 98, 0, 10000, 1, \"R\");</script>";
// else
// document.getElementById("pnlAds").innerHTML = "";

document.getElementById("btnOverlay").style.display = "none";
document.getElementById("btnSplit").style.display = "none";
document.getElementById("btnMostRecent").style.display = "none";
document.getElementById("btnDay").style.display = "none";
document.getElementById("btnWeek").style.display = "none";
document.getElementById("btnMonth").style.display = "none";
document.getElementById("btnPassword").style.display = "none";

document.getElementById("btnTLapse").style.display = "none";
document.getElementById("btnHelp").style.display = "none";

document.getElementById("btnSave").style.display = "none";
document.getElementById("btnPrint").style.display = "none";
document.getElementById("btnEmail").style.display = "none";
document.getElementById("btnLogout").style.display = "none";

document.getElementById("lblSTime").style.display = "none";
document.getElementById("btnTimePrev").style.display = "none";
document.getElementById("btnTimeNext").style.display = "none";

document.getElementById("main_panel").className = "main-image";
document.getElementById("image_split_2").style.display = "none";
document.getElementById("image_split_3").style.display = "none";
document.getElementById("image_split_4").style.display = "none";
document.getElementById("preview").style.display = "none";

document.getElementById("right_panel").style.display = "none";

mode="full";

document.getElementById("slider").style.top = "auto";
document.getElementById("lblZoom").style.top = "auto";
document.getElementById("slider").style.bottom = "10px";
document.getElementById("lblZoom").style.bottom = "35px";

//document.getElementById("lblZoomLabel").style.top = (clientHeight-60)+"px";
document.getElementById("lblZoomLabel").style.top = "auto";
document.getElementById("lblZoomLabel").style.bottom = "35px";
document.getElementById("lblZoomLabel").style.left = "135px";

document.getElementById("slider").style.left = "137px";
document.getElementById("lblZoom").style.left = "255px";
document.getElementById("sliderBox").style.display = "";
document.getElementById("sliderBox").style.left = "127px";
//document.getElementById("sliderBox").style.top = (clientHeight-65)+"px";
document.getElementById("sliderBox").style.bottom = "5px";

document.getElementById("slider_pane_hoz").style.display = "none";
document.getElementById("slider_pane_vrt").style.display = "none";

document.getElementById("btnLeftTop").style.display = "none";
document.getElementById("btnRightBottom").style.display = "none";
document.getElementById("lblLeftTop").style.display = "none";
document.getElementById("lblRightBottom").style.display = "none";

document.getElementById("btnCurrent").style.display = "none";

Resize();

} // end function FScreen

function LoadNormal(resize)
{
showDebug("LoadNormal");
//document.getElementById("left_nav").style.display = "";

document.getElementById("slider").style.top = "";
document.getElementById("lblZoom").style.top = "";
document.getElementById("slider").style.left = "";
document.getElementById("lblZoom").style.left = "";
document.getElementById("sliderBox").style.display = "none";
//document.getElementById("pnlAds").style.display = ads_visible;

document.getElementById("overlay_bg_left").style.display = "none";
document.getElementById("overlay_bg_right").style.display = "none";
document.getElementById("overlay_bg_top").style.display = "none";
document.getElementById("overlay_bg_bottom").style.display = "none";

propertyid = parseInt(document.getElementById("hidPropertyId").value);

if(arrProperties[propertyid]["ads"]=="True")
document.getElementById("pnlAds").style.display = "";
else
document.getElementById("pnlAds").style.display = "none";

document.getElementById("lblZoomLabel").style.top = "";
document.getElementById("lblZoomLabel").style.left = "";

document.getElementById("imgFinal").style.display = "";
document.getElementById("pnlAddress").style.display = ""
document.getElementById("banner").style.display = ""
document.getElementById("pnlProperty").style.display = "";
document.getElementById("pnlClient").style.display = "";
document.getElementById("calendarPanel").style.display = "";
document.getElementById("calendarHeader").style.display = "";
document.getElementById("dayPanel").style.display = "";
document.getElementById("window").style.display = "";
document.getElementById("s_overlay").style.display = "";
document.getElementById("window_selection").style.display = "";
document.getElementById("slider").style.display = "";
document.getElementById("btnDashboard").style.display = "";
document.getElementById("btnVCalendar").style.display = "";
document.getElementById("vCalendar").style.display = "none";
document.getElementById("btnNormalScreen").style.display = "none";
document.getElementById("btnNScreen").style.display = "none";

document.getElementById("btnFullScreen").style.display = "";
document.getElementById("btnPassword").style.display = "";
document.getElementById("btnOverlay").style.display = "";
document.getElementById("btnSplit").style.display = "";
document.getElementById("btnMostRecent").style.display = "";
document.getElementById("btnDay").style.display = "";
document.getElementById("btnWeek").style.display = "";
document.getElementById("btnMonth").style.display = "";

//document.getElementById("btnTLapse").style.display = "";
document.getElementById("btnHelp").style.display = "";

document.getElementById("btnSave").style.display = "";
document.getElementById("btnPrint").style.display = "";
document.getElementById("btnEmail").style.display = "";
document.getElementById("btnLogout").style.display = "";

document.getElementById("lblSTime").style.display = "";
document.getElementById("btnTimePrev").style.display = "";
document.getElementById("btnTimeNext").style.display = "";
document.getElementById("preview").style.display = "";

document.getElementById("slider_pane_hoz").style.display = "none";
document.getElementById("slider_pane_vrt").style.display = "none";

document.getElementById("nav").style.display = "";

document.getElementById("btnCurrent").style.display = "";
document.getElementById("btnLeftTop").style.display = "none";
document.getElementById("btnRightBottom").style.display = "none";
document.getElementById("lblLeftTop").style.display = "none";
document.getElementById("lblRightBottom").style.display = "none";

document.getElementById("btnLeftTop").style.display = "none";
document.getElementById("btnRightBottom").style.display = "none";
document.getElementById("btnCurrent").style.display = "";

document.getElementById("overlay_panel").style.display = "none";
document.getElementById("right_panel").style.display = "none";

ResetSplit();

if(mode=="overlay-h" || mode=="overlay-v")
{
//alert("dtLeftTop:"+dtLeftTop.toString());
currentDay = dtLeftTop.getDate();
currentMonth = dtLeftTop.getMonth()+1;
currentYear = dtLeftTop.getFullYear();
selectedDate = dtLeftTop;
//alert("selectedDate:"+selectedDate.toString());

document.getElementById("lblMonth").innerHTML = months[currentMonth-1]+" "+currentYear;

//if(selected_image == 2)
//{
mode ="normal";
LoadCalendar(true);
//UpdateNav(image1_index);

//} // end if

document.getElementById("btnCurrentContents").innerHTML = document.getElementById("btnLeftTopContents").innerHTML;

} // end if
// else
// {
// index = document.getElementById("ddlTime").selectedIndex;
// UpdateImage(index);
//
// } // end else

mode="normal";

if(resize)
Resize();

} // end function LoadNormal

function LoadDashboard()
{
document.getElementById("overlay").style.display = "";
document.getElementById("dashboard").style.display = "";
document.getElementById("pnlAds").style.display = "none";
xmlHttp = GetXmlHttpObject();

if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==1)
{
document.getElementById("dashboard").style.display = "";
document.getElementById("pnlDashboard").innerHTML = "<img src=\"/images/indicator.gif\" alt=\"Loading\" />";

} // end if
else if(xmlHttp.readyState==4)
{
document.getElementById("pnlDashboard").innerHTML = xmlHttp.responseText;

document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";

} // end if
}

// propertyid = document.getElementById("hidPropertyId").value;
//xmlHttp.open("GET","/getCalendar.ashx?id="+propertyid+"&m="+currentVMonth+"&y="+currentVYear+"&q=v",true);
//xmlHttp.send(null);

} // end function LoadDashboard

screenWidth = 0;
screenHeight = 0;
clientWidth = 0;
clientHeight = 0;

function LoadScreenSize()
{
var screenW = 640, screenH = 480;
if (parseInt(navigator.appVersion)>3) {
screenW = screen.width;
screenH = screen.height;
}
else if (navigator.appName == "Netscape"
&& parseInt(navigator.appVersion)==3
&& navigator.javaEnabled()
)
{
var jToolkit = java.awt.Toolkit.getDefaultToolkit();
var jScreenSize = jToolkit.getScreenSize();
screenW = jScreenSize.width;
screenH = jScreenSize.height;
}

screenWidth = screenW;
screenHeight = screenH;

} // end function LoadScreenSize

function LoadClientSize()
{
var winW, winH;
if (self.innerWidth) {
winW = self.innerWidth;
winH = self.innerHeight;
} else if (document.documentElement && document.documentElement.clientWidth) {
winW = document.documentElement.clientWidth;
winH = document.documentElement.clientHeight;
} else if (document.body) {
winW = document.body.clientWidth;
winH = document.body.clientHeight;
}

clientWidth = winW;
clientHeight = winH;

} // end function LoadClientSize

function Resize()
{
showDebug("Resize");

LoadScreenSize();
LoadClientSize();

var leftMargin = 232;
var topMargin = 110;

if((clientHeight-110)<minHeight)
{
avHeight = minHeight;
document.getElementById("nav").style.top = (800-50)+"px";
document.getElementById("nav").style.bottom = "auto";
}
else
{
avHeight = clientHeight-110;
document.getElementById("nav").style.top = "";
document.getElementById("nav").style.bottom = "";
}

if(mode=="full")
{
document.getElementById("nav").style.top = "";
document.getElementById("nav").style.bottom = "";
}

avWidth = Math.round(avHeight/0.75);
bannerWidth = avWidth+leftMargin;

document.getElementById("banner").style.width = bannerWidth+"px";

if(mode=="normal")
{
// if((clientHeight-110)<650)
// avHeight = 650;
// else
// avHeight = clientHeight-110;
//
// avWidth = Math.round(avHeight/0.75);
//
// bannerWidth = avWidth+leftMargin;

document.getElementById("main_panel").className = "main-image";
document.getElementById("imgLoading").style.marginTop = ((avHeight-55)/2)+"px";
//document.getElementById("imgLoading").style.marginLeft = ((avWidth-54)/2)+"px";
document.getElementById("main_panel").className = "main-image";
document.getElementById("image_split_2").style.display = "none";
document.getElementById("image_split_3").style.display = "none";
document.getElementById("image_split_4").style.display = "none";
document.getElementById("main_panel").style.top = "";
document.getElementById("main_panel").style.left = "";
document.getElementById("main_panel").style.width = avWidth+"px";
document.getElementById("main_panel").style.height = avHeight+"px";
document.getElementById("slider_pane_hoz").style.width = avWidth+"px";
document.getElementById("label1").style.display = "none";
document.getElementById("label2").style.display = "none";
document.getElementById("label3").style.display = "none";
document.getElementById("label4").style.display = "none";
document.getElementById("label1_bg").style.display = "none";
document.getElementById("label2_bg").style.display = "none";
document.getElementById("label3_bg").style.display = "none";
document.getElementById("label4_bg").style.display = "none";
document.getElementById("nav").style.right = screenWidth-(avWidth+242)+"px";

} // end if
else if(mode=="day" || mode=="week" || mode=="month")
{
document.getElementById("main_panel").className = "split-image-1";
document.getElementById("image_split_2").style.display = "";
document.getElementById("image_split_3").style.display = "";
document.getElementById("image_split_4").style.display = "";
document.getElementById("label1").style.display = "";
document.getElementById("label2").style.display = "";
document.getElementById("label3").style.display = "";
document.getElementById("label4").style.display = "";
document.getElementById("label1_bg").style.display = "";
document.getElementById("label2_bg").style.display = "";
document.getElementById("label3_bg").style.display = "";
document.getElementById("label4_bg").style.display = "";

// if((clientHeight-110)<650)
// avHeight = 650;
// else
// avHeight = clientHeight-110;

//avWidth = Math.round(avHeight/0.75);

//bannerWidth = avWidth+232;
label_height = 25;
split_width = Math.round(avWidth/2);
split_height = Math.round(avHeight/2);

document.getElementById("main_panel").style.width = split_width+"px";
document.getElementById("main_panel").style.height = split_height+"px";
document.getElementById("image_split_2").style.left = (split_width+leftMargin)+"px";
document.getElementById("image_split_2").style.width = (avWidth-split_width)+"px";
document.getElementById("image_split_2").style.height = split_height+"px";
document.getElementById("image_split_3").style.top = (topMargin + split_height)+"px";
document.getElementById("image_split_3").style.width = split_width+"px";
document.getElementById("image_split_3").style.height = (avHeight-split_height)+"px";
document.getElementById("image_split_4").style.top = (topMargin + split_height)+"px";
document.getElementById("image_split_4").style.left = (split_width+leftMargin)+"px";
document.getElementById("image_split_4").style.width = (avWidth-split_width)+"px";
document.getElementById("image_split_4").style.height = (avHeight-split_height)+"px";
document.getElementById("label1_bg").style.top = ((topMargin+split_height)-label_height)+"px";
document.getElementById("label1_bg").style.left = leftMargin+"px";
document.getElementById("label1_bg").style.width = document.getElementById("main_panel").style.width;
document.getElementById("label1").style.top = document.getElementById("label1_bg").style.top;
document.getElementById("label1").style.left = document.getElementById("label1_bg").style.left;
document.getElementById("label2_bg").style.top = ((topMargin+split_height)-label_height)+"px";
document.getElementById("label2_bg").style.left = (leftMargin+split_width)+"px";
document.getElementById("label2_bg").style.width = document.getElementById("image_split_2").style.width;
document.getElementById("label2").style.top = document.getElementById("label2_bg").style.top;
document.getElementById("label2").style.left = document.getElementById("label2_bg").style.left;
document.getElementById("label3_bg").style.top = ((topMargin+(avHeight-split_height)+split_height)-label_height)+"px";
document.getElementById("label3_bg").style.left = leftMargin+"px";
document.getElementById("label3_bg").style.width = document.getElementById("image_split_3").style.width;
document.getElementById("label3").style.top = document.getElementById("label3_bg").style.top;
document.getElementById("label3").style.left = document.getElementById("label3_bg").style.left;
document.getElementById("label4_bg").style.top = ((topMargin+(avHeight-split_height)+split_height)-label_height)+"px";
document.getElementById("label4_bg").style.left = leftMargin+(avWidth-split_width)+"px";
document.getElementById("label4_bg").style.width = document.getElementById("image_split_4").style.width;
document.getElementById("label4").style.top = document.getElementById("label4_bg").style.top;
document.getElementById("label4").style.left = document.getElementById("label4_bg").style.left;

document.getElementById("preview").style.top = "";
document.getElementById("preview").style.left = "";

} // end if
else if(mode=="full")
{
document.getElementById("main_panel").className = "main-image-fs";
avHeight = clientHeight;
avWidth = Math.round(avHeight/0.75);
document.getElementById("main_panel").style.width = avWidth+"px";
document.getElementById("main_panel").style.height = avHeight+"px";
document.getElementById("label1").style.display = "none";
document.getElementById("label2").style.display = "none";
document.getElementById("label3").style.display = "none";
document.getElementById("label4").style.display = "none";
document.getElementById("label1_bg").style.display = "none";
document.getElementById("label2_bg").style.display = "none";
document.getElementById("label3_bg").style.display = "none";
document.getElementById("label4_bg").style.display = "none";
document.getElementById("nav").style.right = (screenWidth-avWidth-10)+"px";

} // end if
else if(mode=="overlay-h" || mode=="overlay-v")
{
document.getElementById("overlay_panel").style.display = "";

// if((clientHeight-110)<650)
// avHeight = 650;
// else
// avHeight = clientHeight-110;
//
// avWidth = Math.round(avHeight/0.75);

rh.setMaximum(avWidth);
rv.setMaximum(avHeight);
hozPos = parseInt(document.getElementById("SliderHoz").value);
vrtPos = parseInt(document.getElementById("SliderVrt").value);

document.getElementById("overlay_bg_left").style.display = "";
document.getElementById("overlay_bg_right").style.display = "";
document.getElementById("overlay_bg_top").style.display = "";
document.getElementById("overlay_bg_bottom").style.display = "";

if(mode=="overlay-h")
{
document.getElementById("main_panel").style.width = hozPos+"px";
document.getElementById("main_panel").style.height = avHeight+"px";
document.getElementById("overlay_panel").style.top = topMargin+"px";
document.getElementById("overlay_panel").style.left = (hozPos+leftMargin)+"px";
document.getElementById("overlay_panel").style.width = (avWidth-hozPos)+"px";
document.getElementById("overlay_panel").style.height = avHeight+"px";

} // end if

if(mode=="overlay-v")
{
document.getElementById("main_panel").style.width = avWidth+"px";
document.getElementById("main_panel").style.height = avHeight-vrtPos+"px";
document.getElementById("overlay_panel").style.left = leftMargin+"px";
document.getElementById("overlay_panel").style.top = topMargin+avHeight-vrtPos+"px";
document.getElementById("overlay_panel").style.width = avWidth+"px";
document.getElementById("overlay_panel").style.height = vrtPos+"px";

} // end if

} // end if
else if(mode == "split")
{
fwidth = avWidth+leftMargin;
panelWidth = Math.round(fwidth/2);
panelHeight = Math.round(panelWidth*0.75);

document.getElementById("imgLoading").style.marginTop = ((panelHeight-55)/2)+"px";
document.getElementById("imgLoadingRight").style.marginTop = ((panelHeight-55)/2)+"px";

document.getElementById("main_panel").style.left = "0px";
document.getElementById("main_panel").style.width = panelWidth+"px";
document.getElementById("main_panel").style.height = panelHeight+"px";

document.getElementById("right_panel").style.left = panelWidth+"px";
document.getElementById("right_panel").style.width = (fwidth-panelWidth)+"px";
document.getElementById("right_panel").style.height = panelHeight+"px";

document.getElementById("btnCurrent").style.display = "none";

document.getElementById("splitBg").style.display = "";
document.getElementById("splitBg").style.width = fwidth+"px";
document.getElementById("splitBg").style.height = (clientHeight-(topMargin+panelHeight))+"px";
document.getElementById("splitBg").style.left = "0px";
document.getElementById("splitBg").style.top = (topMargin+panelHeight)+"px";

document.getElementById("calendarHeader").style.top = (topMargin+panelHeight+2)+"px";
document.getElementById("calendarHeader").style.left = "2px";
document.getElementById("calendarPanel").style.top = (topMargin+panelHeight+30)+"px";
document.getElementById("calendarPanel").style.left = "2px";

document.getElementById("calendarHeader2").style.display = "";
document.getElementById("calendarPanel2").style.display = "";

document.getElementById("calendarHeader2").style.top = (topMargin+panelHeight+2)+"px";
document.getElementById("calendarHeader2").style.left = (fwidth-228-2)+"px";
document.getElementById("calendarPanel2").style.top = (topMargin+panelHeight+30)+"px";
document.getElementById("calendarPanel2").style.left = (fwidth-228-2)+"px";

document.getElementById("preview").style.top = (topMargin+panelHeight+2)+"px";
document.getElementById("preview").style.left = Math.round((fwidth-226)/2)+"px";

document.getElementById("window").style.left = (Math.round((fwidth-226)/2)+3)+"px";
document.getElementById("window").style.top = (topMargin+panelHeight+4)+"px";

document.getElementById("window_selection").style.left = (Math.round((fwidth-226)/2)+3)+"px";
document.getElementById("window_selection").style.top = (topMargin+panelHeight+4)+"px";

document.getElementById("s_overlay").style.left = (Math.round((fwidth-226)/2)+4)+"px";
document.getElementById("s_overlay").style.top = (topMargin+panelHeight+5)+"px";

document.getElementById("slider").style.left = (Math.round((fwidth-226)/2)+5)+"px";
document.getElementById("slider").style.top = (topMargin+panelHeight+195)+"px";

document.getElementById("lblZoom").style.left = (Math.round((fwidth-226)/2)+123)+"px";
document.getElementById("lblZoom").style.top = (topMargin+panelHeight+175)+"px";

document.getElementById("lblZoomLabel").style.left = (Math.round((fwidth-226)/2)+3)+"px";
document.getElementById("lblZoomLabel").style.top = (topMargin+panelHeight+175)+"px";

UpdateButtonsSplit(fwidth, panelWidth, panelHeight, topMargin);

} // end if

document.getElementById("overlay").style.width = clientWidth+"px";
//document.getElementById("overlay").style.height = clientHeight+"px";

if(clientHeight < 800)
document.getElementById("overlay").style.height = "800px";
else
document.getElementById("overlay").style.height = clientHeight+"px";

document.getElementById("loading_pane").style.width = clientWidth+"px";
document.getElementById("loading_pane").style.height = clientHeight+"px";

ResizeVCalendar();
ResizeDashboard();
ResizeTLapse();
ResizeEmail();
ResizePassword();
ResizeHelp();
ResizeImage();

} // end function Resize

function ResetSplit()
{
document.getElementById("main_panel").style.left = "";
document.getElementById("main_panel").style.width = "";
document.getElementById("main_panel").style.height = "";

document.getElementById("right_panel").style.display = "none";
document.getElementById("btnCurrent").style.display = "";
document.getElementById("splitBg").style.display = "none";

document.getElementById("calendarHeader").style.top = "";
document.getElementById("calendarHeader").style.left = "";
document.getElementById("calendarPanel").style.top = "";
document.getElementById("calendarPanel").style.left = "";

document.getElementById("calendarHeader2").style.display = "none";
document.getElementById("calendarPanel2").style.display = "none";

document.getElementById("preview").style.top = "";
document.getElementById("preview").style.left = "";

document.getElementById("window").style.left = "";
document.getElementById("window").style.top = "";
document.getElementById("window_selection").style.left = "";
document.getElementById("window_selection").style.top = "";


//document.getElementById("selection").style.marginLeft = "0px";
//document.getElementById("selection").style.marginTop = "0px";

document.getElementById("s_overlay").style.left = "";
document.getElementById("s_overlay").style.top = "";

document.getElementById("slider").style.left = "";
document.getElementById("slider").style.top = "";

document.getElementById("lblZoom").style.left = "";
document.getElementById("lblZoom").style.top = "";

document.getElementById("lblSplit1").style.display = "none";
document.getElementById("lblSplit2").style.display = "none";

document.getElementById("btnVCalendar").style.top = "";
document.getElementById("btnVCalendar").style.left = "";

document.getElementById("btnMostRecent").style.left = "";
document.getElementById("btnMostRecent").style.top = "";

document.getElementById("btnDay").style.left = "";
document.getElementById("btnDay").style.top = "";
document.getElementById("btnWeek").style.left = "";
document.getElementById("btnWeek").style.top = "";
document.getElementById("btnMonth").style.left = "";
document.getElementById("btnMonth").style.top = "";

document.getElementById("lblSTime").style.left = "";
document.getElementById("lblSTime").style.top = "";
document.getElementById("btnTimePrev").style.left = "";
document.getElementById("btnTimePrev").style.top = "";
document.getElementById("btnTimeNext").style.left = "";
document.getElementById("btnTimeNext").style.top = "";

document.getElementById("btnDashboard").style.left = "";
document.getElementById("btnDashboard").style.top = "";

document.getElementById("btnNormalScreen").style.left = "";
document.getElementById("btnNormalScreen").style.top = "";

document.getElementById("btnSave").style.left = "";
document.getElementById("btnSave").style.top = "";
document.getElementById("btnPrint").style.left = "";
document.getElementById("btnPrint").style.top = "";
document.getElementById("btnEmail").style.left = "";
document.getElementById("btnEmail").style.top = "";

document.getElementById("btnSplit").style.left = "";
document.getElementById("btnSplit").style.top = "";
document.getElementById("btnOverlay").style.left = "";
document.getElementById("btnOverlay").style.top = "";
document.getElementById("btnTLapse").style.left = "";
document.getElementById("btnTLapse").style.top = "";

document.getElementById("btnPassword").style.left = "";
document.getElementById("btnPassword").style.top = "";

document.getElementById("btnLogout").style.left = "";
document.getElementById("btnLogout").style.top = "";

document.getElementById("btnHelp").style.left = "";
document.getElementById("btnHelp").style.top = "";

document.getElementById("btnVCalendar2").style.display = "none";
document.getElementById("btnMostRecent2").style.display = "none";
document.getElementById("lblSTime2").style.display = "none";
document.getElementById("btnTimePrev2").style.display = "none";
document.getElementById("btnTimeNext2").style.display = "none";
document.getElementById("btnDay2").style.display = "none";
document.getElementById("btnWeek2").style.display = "none";
document.getElementById("btnMonth2").style.display = "none";
document.getElementById("btnDashboard2").style.display = "none";
document.getElementById("btnNormalScreen2").style.display = "none";
document.getElementById("btnSave2").style.display = "none";
document.getElementById("btnPrint2").style.display = "none";
document.getElementById("btnEmail2").style.display = "none";
document.getElementById("btnSplit2").style.display = "none";
document.getElementById("btnOverlay2").style.display = "none";
document.getElementById("btnTLapse2").style.display = "none";
document.getElementById("btnLogout2").style.display = "none";
document.getElementById("btnPassword2").style.display = "none";
document.getElementById("btnHelp2").style.display = "none";

} // end function ResetButtonsSplit

function UpdateButtonsSplit(fwidth, panelWidth, panelHeight, topMargin)
{
leftMargin = 228+4;

document.getElementById("lblSplit1").style.display = "";
document.getElementById("lblSplit1").style.width = "226px";
document.getElementById("lblSplit1").style.top = (topMargin+panelHeight+2)+"px";
document.getElementById("lblSplit1").style.left = leftMargin+"px";

document.getElementById("lblSplit2").style.display = "";
document.getElementById("lblSplit2").style.width = "226px";
document.getElementById("lblSplit2").style.top = (topMargin+panelHeight+2)+"px";
document.getElementById("lblSplit2").style.borderColor = "#354351";
document.getElementById("lblSplit2").style.left = (avWidth-228)+"px";

topMargin += panelHeight+30;

document.getElementById("btnVCalendar").style.top = topMargin+"px";
document.getElementById("btnVCalendar").style.left = leftMargin+"px";

document.getElementById("btnMostRecent").style.left = leftMargin+"px";
document.getElementById("btnMostRecent").style.top = (topMargin+24)+"px";

document.getElementById("lblSTime").style.left = (leftMargin+115)+"px";
document.getElementById("lblSTime").style.top = (topMargin+24)+"px";

document.getElementById("btnTimePrev").style.left = (leftMargin+115)+"px";
document.getElementById("btnTimePrev").style.top = (topMargin+24)+"px";

document.getElementById("btnTimeNext").style.left = (leftMargin+206)+"px";
document.getElementById("btnTimeNext").style.top = (topMargin+24)+"px";

document.getElementById("btnDay").style.left = leftMargin+"px";
document.getElementById("btnDay").style.top = (topMargin+(2*24))+"px";
document.getElementById("btnWeek").style.left = (leftMargin+77)+"px";
document.getElementById("btnWeek").style.top = (topMargin+(2*24))+"px";
document.getElementById("btnMonth").style.left = (leftMargin+153)+"px";
document.getElementById("btnMonth").style.top = (topMargin+(2*24))+"px";

document.getElementById("btnDashboard").style.left = leftMargin+"px";
document.getElementById("btnDashboard").style.top = (topMargin+(3*24))+"px";

document.getElementById("btnNormalScreen").style.left = (leftMargin+115)+"px";
document.getElementById("btnNormalScreen").style.top = (topMargin+(3*24))+"px";

document.getElementById("btnSave").style.left = leftMargin+"px";
document.getElementById("btnSave").style.top = (topMargin+(4*24))+"px";
document.getElementById("btnPrint").style.left = (leftMargin+77)+"px";
document.getElementById("btnPrint").style.top = (topMargin+(4*24))+"px";
document.getElementById("btnEmail").style.left = (leftMargin+153)+"px";
document.getElementById("btnEmail").style.top = (topMargin+(4*24))+"px";

document.getElementById("btnSplit").style.left = leftMargin+"px";
document.getElementById("btnSplit").style.top = (topMargin+(5*24))+"px";
document.getElementById("btnOverlay").style.left = (leftMargin+77)+"px";
document.getElementById("btnOverlay").style.top = (topMargin+(5*24))+"px";
document.getElementById("btnTLapse").style.left = (leftMargin+153)+"px";
document.getElementById("btnTLapse").style.top = (topMargin+(5*24))+"px";

document.getElementById("btnPassword").style.left = leftMargin+"px";
document.getElementById("btnPassword").style.top = (topMargin+(6*24))+"px";

document.getElementById("btnLogout").style.left = (leftMargin)+"px";
document.getElementById("btnLogout").style.top = (topMargin+(6*24))+"px";

document.getElementById("btnHelp").style.left = (leftMargin+115)+"px";
document.getElementById("btnHelp").style.top = (topMargin+(6*24))+"px";

// Right Side

//leftMargin += 226+219+15;
leftMargin = avWidth-228;

document.getElementById("btnVCalendar2").style.display = "";
document.getElementById("btnVCalendar2").style.top = topMargin+"px";
document.getElementById("btnVCalendar2").style.left = leftMargin+"px";

document.getElementById("btnMostRecent2").style.display = "";
document.getElementById("btnMostRecent2").style.left = leftMargin+"px";
document.getElementById("btnMostRecent2").style.top = (topMargin+24)+"px";

document.getElementById("lblSTime2").style.display = "";
document.getElementById("lblSTime2").style.left = (leftMargin+115)+"px";
document.getElementById("lblSTime2").style.top = (topMargin+24)+"px";

document.getElementById("btnTimePrev2").style.display = "";
document.getElementById("btnTimePrev2").style.left = (leftMargin+115)+"px";
document.getElementById("btnTimePrev2").style.top = (topMargin+24)+"px";

document.getElementById("btnTimeNext2").style.display = "";
document.getElementById("btnTimeNext2").style.left = (leftMargin+206)+"px";
document.getElementById("btnTimeNext2").style.top = (topMargin+24)+"px";

document.getElementById("btnDay2").style.display = "";
document.getElementById("btnDay2").style.left = leftMargin+"px";
document.getElementById("btnDay2").style.top = (topMargin+(2*24))+"px";
document.getElementById("btnWeek2").style.display = "";
document.getElementById("btnWeek2").style.left = (leftMargin+77)+"px";
document.getElementById("btnWeek2").style.top = (topMargin+(2*24))+"px";
document.getElementById("btnMonth2").style.display = "";
document.getElementById("btnMonth2").style.left = (leftMargin+153)+"px";
document.getElementById("btnMonth2").style.top = (topMargin+(2*24))+"px";

document.getElementById("btnDashboard2").style.display = "";
document.getElementById("btnDashboard2").style.left = leftMargin+"px";
document.getElementById("btnDashboard2").style.top = (topMargin+(3*24))+"px";

document.getElementById("btnNormalScreen2").style.display = "";
document.getElementById("btnNormalScreen2").style.left = (leftMargin+115)+"px";
document.getElementById("btnNormalScreen2").style.top = (topMargin+(3*24))+"px";

document.getElementById("btnSave2").style.display = "";
document.getElementById("btnSave2").style.left = leftMargin+"px";
document.getElementById("btnSave2").style.top = (topMargin+(4*24))+"px";
document.getElementById("btnPrint2").style.display = "";
document.getElementById("btnPrint2").style.left = (leftMargin+77)+"px";
document.getElementById("btnPrint2").style.top = (topMargin+(4*24))+"px";
document.getElementById("btnEmail2").style.display = "";
document.getElementById("btnEmail2").style.left = (leftMargin+153)+"px";
document.getElementById("btnEmail2").style.top = (topMargin+(4*24))+"px";

document.getElementById("btnSplit2").style.display = "";
document.getElementById("btnSplit2").style.left = leftMargin+"px";
document.getElementById("btnSplit2").style.top = (topMargin+(5*24))+"px";
document.getElementById("btnOverlay2").style.display = "";
document.getElementById("btnOverlay2").style.left = (leftMargin+77)+"px";
document.getElementById("btnOverlay2").style.top = (topMargin+(5*24))+"px";
document.getElementById("btnTLapse2").style.display = "";
document.getElementById("btnTLapse2").style.left = (leftMargin+153)+"px";
document.getElementById("btnTLapse2").style.top = (topMargin+(5*24))+"px";

document.getElementById("btnPassword2").style.display = "";
document.getElementById("btnPassword2").style.left = leftMargin+"px";
document.getElementById("btnPassword2").style.top = (topMargin+(6*24))+"px";

document.getElementById("btnLogout2").style.display = "";
document.getElementById("btnLogout2").style.left = (leftMargin)+"px";
document.getElementById("btnLogout2").style.top = (topMargin+(6*24))+"px";

document.getElementById("btnHelp2").style.display = "";
document.getElementById("btnHelp2").style.left = (leftMargin + 115) + "px";
document.getElementById("btnHelp2").style.top = (topMargin+(6*24))+"px";

} // end function UpdateButtonsSplit

function ResizeImage()
{
showDebug("ResizeImage");

oWidth = avWidth;
oHeight = avHeight;

ratio = document.getElementById("Slider1").value;

if(ratio==0)
ratio = 100;

if(mode=="normal")
{
width = Math.round((ratio/100)*oWidth);
height = Math.round((ratio/100)*oHeight);

document.getElementById("image").style.width = width+"px";
newLeft = Math.round(left_-((width-oWidth)/2));
newTop = Math.round(top_-((height-oHeight)/2));
document.getElementById("image").style.marginLeft = newLeft+"px";
document.getElementById("image").style.marginTop = newTop+"px";

} // end if
else if(mode=="day" || mode=="week" || mode=="month")
{
split_width = Math.round(oWidth/2);
split_height = Math.round(oHeight/2);

width = Math.round((ratio/100)*split_width);
height = Math.round((ratio/100)*split_height);

document.getElementById("image").style.width = width+"px";
document.getElementById("image2").style.width = width+"px";
document.getElementById("image3").style.width = width+"px";
document.getElementById("image4").style.width = width+"px";

newLeft = Math.round(left_-((width-split_width)/2));
newTop = Math.round(top_-((height-split_height)/2));

document.getElementById("image").style.marginTop = newTop+"px";
document.getElementById("image2").style.marginTop = newTop+"px";
document.getElementById("image3").style.marginTop = newTop+"px";
document.getElementById("image4").style.marginTop = newTop+"px";

document.getElementById("image").style.marginLeft = newLeft+"px";
document.getElementById("image2").style.marginLeft = newLeft+"px";
document.getElementById("image3").style.marginLeft = newLeft+"px";
document.getElementById("image4").style.marginLeft = newLeft+"px";

} // end if
else if(mode=="full")
{
width = Math.round((ratio/100)*oWidth);
height = Math.round((ratio/100)*oHeight);

document.getElementById("image").style.width = width+"px";
newLeft = left_-((width-oWidth)/2);
newTop = top_-((height-oHeight)/2);
document.getElementById("image").style.marginLeft = newLeft+"px";
document.getElementById("image").style.marginTop = newTop+"px";

} // end if
else if(mode=="overlay-h")
{
width = Math.round((ratio/100)*oWidth);
height = Math.round((ratio/100)*oHeight);

document.getElementById("image").style.width = width+"px";
document.getElementById("image_overlay").style.width = width+"px";

newLeft = Math.round(left_-((width-oWidth)/2));
newTop = Math.round(top_-((height-oHeight)/2));

document.getElementById("image").style.marginLeft = newLeft+"px";
document.getElementById("image").style.marginTop = newTop+"px";

hozPos = parseInt(document.getElementById("SliderHoz").value);
vrtPos = parseInt(document.getElementById("SliderVrt").value);

document.getElementById("image_overlay").style.marginLeft = newLeft-hozPos+"px";
document.getElementById("image_overlay").style.marginTop = newTop+"px";

if(hozPos > 0 && hozPos < width)
{
document.getElementById("separator").style.display = "";
document.getElementById("separator").style.borderLeft = "solid 1px";
document.getElementById("separator").style.borderRight = "solid 1px";
document.getElementById("separator").style.borderBottom = "solid 1px";
document.getElementById("separator").style.width = "1px";
// document.getElementById("separator").style.height = height-1+"px";
document.getElementById("separator").style.height = oHeight-2+"px";
document.getElementById("separator").style.top = 110+"px";
document.getElementById("separator").style.left = (hozPos+232)+"px";

} // end if
else
document.getElementById("separator").style.display = "none";

} // end if
else if (mode=="overlay-v")
{
width = Math.round((ratio/100)*oWidth);
height = Math.round((ratio/100)*oHeight);

document.getElementById("image").style.width = width+"px";
document.getElementById("image_overlay").style.width = width+"px";

newLeft = Math.round(left_-((width-oWidth)/2));
newTop = Math.round(top_-((height-oHeight)/2));

document.getElementById("image").style.marginLeft = newLeft+"px";
document.getElementById("image").style.marginTop = newTop+"px";

hozPos = parseInt(document.getElementById("SliderHoz").value);
vrtPos = parseInt(document.getElementById("SliderVrt").value);

document.getElementById("image_overlay").style.marginLeft = newLeft+"px";
document.getElementById("image_overlay").style.marginTop = newTop-(avHeight-vrtPos)+"px";

if(vrtPos > 0)
{
document.getElementById("separator").style.display = "";
document.getElementById("separator").style.borderTop = "solid 1px";
document.getElementById("separator").style.borderBottom = "solid 1px";
document.getElementById("separator").style.height = "1px";
//document.getElementById("separator").style.width = (width-2)+"px";
document.getElementById("separator").style.width = (oWidth-2)+"px";
document.getElementById("separator").style.top = (oHeight-vrtPos+110)+"px";
document.getElementById("separator").style.left = (232)+"px";

} // end if
else
document.getElementById("separator").style.display = "none";

} // end else if

setTimeout("document.getElementById('separator').style.display='none'",2000);

hozPos = parseInt(document.getElementById("SliderHoz").value);
vrtPos = parseInt(document.getElementById("SliderVrt").value);

document.getElementById("overlay_bg_left").style.width = hozPos+"px";
document.getElementById("overlay_bg_right").style.left = (hozPos+232)+"px";
document.getElementById("overlay_bg_right").style.width = (oWidth-hozPos)+"px";

document.getElementById("overlay_bg_top").style.height = (avHeight-vrtPos)+"px";
document.getElementById("overlay_bg_bottom").style.top = (avHeight-vrtPos+110)+"px";
document.getElementById("overlay_bg_bottom").style.height = (vrtPos)+"px";

sWidth = Math.round((100/ratio)*219);
sHeight = Math.round((100/ratio)*164);

document.getElementById("selection").style.width = sWidth+"px";
document.getElementById("selection").style.height = sHeight+"px";

if (mode!="split")
{
sLeft = Math.round((219-sWidth)/2)
sTop = Math.round((164-sHeight)/2);

//alert(sWidth +"x" + sHeight + " at: " + sLeft + ","+sTop);

document.getElementById("selection").style.marginLeft = (sLeft)+"px";
document.getElementById("selection").style.marginTop = (sTop)+"px";

// document.getElementById("selection_image").style.marginLeft = -sLeft+"px";
// document.getElementById("selection_image").style.marginTop = -sTop+"px";

document.getElementById("selection").style.backgroundPosition = (-sLeft)+"px "+ (-sTop)+"px";
// document.getElementById("selection").style.marginTop = -sTop+"px";

} // end if
else if (mode=="split")
{
topMargin = 110;
leftMargin = 232;

fwidth = avWidth+leftMargin;
//alert("fwidth:"+fwidth);
panelWidth = Math.round(fwidth/2);
//alert("panelWidth:"+panelWidth);
panelHeight = Math.round(panelWidth*0.75);

sLeft = ((219-sWidth)/2);
sTop = ((164-sHeight)/2);

//document.getElementById("selection").style.marginLeft = ((Math.round((fwidth-226)/2)+4)+sLeft)+"px";
//document.getElementById("selection").style.marginTop = ((topMargin+panelHeight+5)+sTop)+"px";

document.getElementById("selection").style.marginLeft = (+sLeft)+"px";
document.getElementById("selection").style.marginTop = (sTop)+"px";

//document.getElementById("selection_image").style.marginLeft = -sLeft+"px";
//document.getElementById("selection_image").style.marginTop = -sTop+"px";

document.getElementById("selection").style.backgroundPosition = (-sLeft)+"px "+ (-sTop)+"px";

width = Math.round((ratio/100)*panelWidth);
height = Math.round((ratio/100)*panelHeight);

document.getElementById("image").style.width = width+"px";
document.getElementById("imageRight").style.width = width+"px";

newLeft = Math.round(left_-((width-panelWidth)/2));
newTop = Math.round(top_-((height-panelHeight)/2));

document.getElementById("image").style.marginTop = newTop+"px";
document.getElementById("imageRight").style.marginTop = newTop+"px";
document.getElementById("image").style.marginLeft = newLeft+"px";
document.getElementById("imageRight").style.marginLeft = newLeft+"px";

//alert("topMargin:"+topMargin);
//alert("panelHeight:"+panelHeight);
//alert(document.getElementById("selection").style.top);

} // end else

document.getElementById("cv_logo").style.left = "";
//document.getElementById("ydc_logo").style.left = "";

if(clientHeight > 800)
{
document.getElementById("cv_logo").style.top = "";
//document.getElementById("ydc_logo").style.top = "";
document.getElementById("cv_logo").style.bottom = "5px";
//document.getElementById("ydc_logo").style.bottom = "5px";
document.getElementById("cv_logo").style.left = "";
}
else
{
document.getElementById("cv_logo").style.top = "748px";
//document.getElementById("ydc_logo").style.top = "762px";
document.getElementById("cv_logo").style.bottom = "";
document.getElementById("cv_logo").style.left = "";
//document.getElementById("ydc_logo").style.bottom = "";
}

if(mode=="full")
{
document.getElementById("cv_logo").style.top = "";
//document.getElementById("ydc_logo").style.top = "";
//document.getElementById("ydc_logo").style.left = "5px";
document.getElementById("cv_logo").style.bottom = "42px";
document.getElementById("cv_logo").style.left = "10px";
//document.getElementById("ydc_logo").style.bottom = "5px";

} // end if

document.getElementById("cv_logo").style.display = "";
//document.getElementById("ydc_logo").style.display = "";

} // end function Resize

function ResizeVCalendar()
{
vWidth = 800;
vHeight = 600;

vLeft = 0;
vTop = 0;

if(clientHeight<vHeight)
vTop = 0;
else
vTop = (clientHeight-vHeight)/2;

if(clientWidth<vWidth)
vLeft = 0;
else
vLeft = (clientWidth-vWidth)/2;

document.getElementById("vCalendar").style.left = vLeft+"px";
document.getElementById("vCalendar").style.top = vTop+"px";

} // end function ResizeVCalendar

function ResizeEmail()
{
vWidth = 365;
vHeight = 310;

vLeft = 0;
vTop = 0;

if(clientHeight<vHeight)
vTop = 0;
else
vTop = (clientHeight-vHeight)/2;

if(clientWidth<vWidth)
vLeft = 0;
else
vLeft = (clientWidth-vWidth)/2;

document.getElementById("pnlEmail").style.left = vLeft+"px";
document.getElementById("pnlEmail").style.top = vTop+"px";

document.getElementById("pnlHelpEmail").style.left = vLeft+"px";
document.getElementById("pnlHelpEmail").style.top = vTop+"px";

} // end function ResizeEmail

function ResizePassword()
{
vWidth = 230;
vHeight = 290;

vLeft = 0;
vTop = 0;

if(clientHeight<vHeight)
vTop = 0;
else
vTop = (clientHeight-vHeight)/2;

if(clientWidth<vWidth)
vLeft = 0;
else
vLeft = (clientWidth-vWidth)/2;

document.getElementById("pnlPassword").style.left = vLeft+"px";
document.getElementById("pnlPassword").style.top = vTop+"px";

} // end function ResizePassword

function ResizeHelp()
{
vWidth = 750;
vHeight = 250;

vLeft = 0;
vTop = 0;

if(clientHeight<vHeight)
vTop = 0;
else
vTop = (clientHeight-vHeight)/2;

if(clientWidth<vWidth)
vLeft = 0;
else
vLeft = (clientWidth-vWidth)/2;

document.getElementById("pnlHelp").style.left = vLeft+"px";
document.getElementById("pnlHelp").style.top = vTop+"px";

} // end function ResizeHelp

function ResizeDashboard()
{
dHeight = clientHeight;

if(clientHeight < 800)
dHeight = 800;

document.getElementById("dashboard").style.height = dHeight+"px";
document.getElementById("tblDboard").style.height = (dHeight-25-98)+"px";

} // end function ResizeDashboard

function ResizeTLapse()
{
tWidth = 320;
tHeight = 299;

tLeft = 0;
tTop = 0;

if(clientHeight<tHeight)
tTop = 0;
else
tTop = (clientHeight-tHeight)/2;

if(clientWidth<tWidth)
tLeft = 0;
else
tLeft = (clientWidth-tWidth)/2;

document.getElementById("tLapsePane").style.left = tLeft+"px";
document.getElementById("tLapsePane").style.top = tTop+"px";

} // end function ResizeTLapse

function Initialize()
{
if(document.getElementById("hidDebug").value == "1")
{
debug = true;
document.getElementById("_debug").style.display = "";

} // end if

show();
window.setTimeout("CloseLoading()", 1000);
Load();

} // end function Initialize

function Load()
{
Resize();
InitDragDrop();

if(parseInt(document.getElementById("hidProperty_Count").value)==1)
SelectProperty(parseInt(document.getElementById("hidPropertyId").value));

} // end function Load.

function LoadSplit()
{
//alert("Coming Soon");
// return;

if(mode=="split")
return;

LoadNormal(true);
mode = "split";

document.getElementById("hidPropertyId2").value = document.getElementById("hidPropertyId").value;

document.getElementById("right_panel").style.display = "";
document.getElementById("imageRight").style.display = "";
document.getElementById("nav").style.display = "none";

document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";

//document.getElementById("imageRight").src = document.getElementById("image").src;
//alert(document.getElementById("imageRight").src);
document.getElementById("imgLoadingRight").style.display = "none";

currentMonth2 = currentMonth;
currentYear2 = currentYear;
currentDay2 = currentDay;
currentVYear2 = currentVYear;
currentVMonth2 = currentVMonth;

selectedDate2 = selectedDate;
LoadProperty(2);

Resize();

} // end function LoadSplit

function LoadOverlay()
{
if(mode != "overlay-h" && mode != "overlay-v")
{
showDebug("LoadOverlay");

LoadNormal(true);

mode="overlay-h";

document.getElementById("nav").style.display = "none";
document.getElementById("slider_pane_hoz").style.display = "";
document.getElementById("slider_pane_vrt").style.display = "";

document.getElementById("slider_pane_hoz").style.width = avWidth+"px";
document.getElementById("hoz_slider").style.width = avWidth+"px";

document.getElementById("vrt_slider").style.height = avHeight+"px";

document.getElementById("btnNormalScreen").style.display = "";
document.getElementById("btnFullScreen").style.display = "none";

document.getElementById("btnCurrent").style.display = "none";
document.getElementById("btnLeftTop").style.display = "";
document.getElementById("btnRightBottom").style.display = "";
document.getElementById("lblLeftTop").style.display = "";
document.getElementById("lblRightBottom").style.display = "";

//document.getElementById("image_overlay").src = document.getElementById("image").src;

document.getElementById("btnLeftTopContents").innerHTML = document.getElementById("btnCurrentContents").innerHTML;

dtLeftTop.setFullYear(currentYear, currentMonth-1, currentDay);

// alert("dtLeftTop at LoadOverlay: "+dtLeftTop.toString());

image1_index = document.getElementById("ddlTime").selectedIndex;

if(!overlay_ini)
{
//alert("InitializeOverlay()");
InitializeOverlay();
}

LoadOverlay2();

} // end if

} // end function LoadOverlay

function LoadOverlay2()
{
showDebug("LoadOverlay2");

xmlHttp = GetXmlHttpObject();

if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==1)
{
document.getElementById("overlay_panel").style.display = "";
}

if(xmlHttp.readyState==4)
{
dtRightBottom.setFullYear(currentYear, currentMonth-1, currentDay);

//alert(xmlHttp.responseText);

if(xmlHttp.responseText == "1")
dtRightBottom.setDate(dtRightBottom.getDate()-1);

selectedDate = dtRightBottom;
currentDay = selectedDate.getDate();
currentMonth = selectedDate.getMonth()+1;
currentYear = selectedDate.getFullYear();

selected_image = 2;
//image2_index = -1;

document.getElementById("btnRightBottom").style.borderColor = "#fff";
document.getElementById("btnLeftTop").style.borderColor = "#354351";
document.getElementById("btnRightBottom").style.color = "#fff";
document.getElementById("btnLeftTop").style.color = "#3A4856";

document.getElementById("lblLeftTop").style.color = "#3A4856";
document.getElementById("lblRightBottom").style.color = "#fff";

document.getElementById("imgLoadingOverlay").style.display = "none";
document.getElementById("image_overlay").style.display = "";

LoadCalendar(true);

} // end if
}

xmlHttp.open("GET.html","/getImage.ashx?id="+document.getElementById("hidPropertyId").value+"&d="+currentDay+"&m="+currentMonth+"&y="+currentYear+"&t=o&p=1",false);
xmlHttp.send(null);

} // end function LoadOverlay2

function InitializeOverlay()
{
showDebug("InitializeOverlay");
image2_index = -1;

if((clientHeight-110)<minHeight)
avHeight = minHeight;
else
avHeight = clientHeight-110;

avWidth = Math.round(avHeight/0.75);

//alert(avWidth + " x " +avHeight);

rh = new Slider(document.getElementById("hoz_slider"), document.getElementById("hoz_slider_input"));
rh.setMaximum(avWidth);
rh.setValue(Math.round(avWidth/2));
var rhi = document.getElementById("SliderHoz");
rhi.value = rh.getValue();
//alert(rhi.value);

rh.onchange = function ()
{
rhi.value = rh.getValue();
mode = "overlay-h";

document.getElementById("lblLeftTop").innerHTML = "Left";
document.getElementById("lblRightBottom").innerHTML = "Right";

Resize();
};

rv = new Slider(document.getElementById("vrt_slider"), document.getElementById("vrt_slider_input"), "vertical");
rv.setMaximum(avHeight);
rv.setValue(Math.round(avHeight/2));

var rvi = document.getElementById("SliderVrt");
rvi.value = rv.getValue();

rv.onchange = function ()
{
rvi.value = rv.getValue();
mode = "overlay-v";

document.getElementById("lblLeftTop").innerHTML = "Top";
document.getElementById("lblRightBottom").innerHTML = "Bottom";

Resize();
};

Resize();
overlay_ini = true;

} // end function InitializeOverlay

function Print()
{
window.print();

} // end function Print

function Save(image_no)
{
document.getElementById("frDownload").src = "";

if(image_no == 1)
{
index = document.getElementById("ddlTime").selectedIndex;
document.getElementById("frDownload").src = "/download.ashx?id="+document.getElementById("hidPropertyId").value+"&img="+arrImages[index]["img"];

} // end if
else
{
index = document.getElementById("ddlTime2").selectedIndex;
document.getElementById("frDownload").src = "/download.ashx?id="+document.getElementById("hidPropertyId2").value+"&img="+arrImages2[index]["img"];

} // end else

} // end function Save

function Email(image_no)
{
document.getElementById("overlay").style.display = "";
document.getElementById("pnlEmail").style.display = "";
document.getElementById("pnlEmailForm").style.display = "";
document.getElementById("pnlEmailResult").style.display = "none";
document.getElementById("pnlAds").style.display = "none";

if(image_no==1)
{
index = document.getElementById("ddlTime").selectedIndex;
time = arrImages[index]["time"];
document.getElementById("txtMessage").value = currentDay + "/" + currentMonth + "/" + currentYear + " - " + time;

} // end if
else if(image_no==2)
{
index = document.getElementById("ddlTime2").selectedIndex;
time = arrImages2[index]["time"];
document.getElementById("txtMessage").value = currentDay2 + "/" + currentMonth2 + "/" + currentYear2 + " - " + time;

} // end if

} // end function Email

function ChangePassword()
{
document.getElementById("overlay").style.display = "";
document.getElementById("pnlPassword").style.display = "";
document.getElementById("pnlAds").style.display = "none";
document.getElementById("frmPassword").src = "password.html";

} // end function ChangePassword

function HelpEmail(email)
{
CloseHelp();
document.getElementById("overlay").style.display = "";
document.getElementById("pnlAds").style.display = "none";
document.getElementById("pnlHelpEmail").style.display = "";
document.getElementById("pnlHelpEmailForm").style.display = "";
document.getElementById("pnlHelpEmailResult").style.display = "none";
document.getElementById("txtHelpRecipient").value = email;

if(email=="help@constructionview.com.au")
document.getElementById("txtHelpSubject").value = "Help";
else if(email=="feedback@constructionview.com.au")
document.getElementById("txtHelpSubject").value = "Feedback";

} // end function HelpEmail

function Help()
{
    document.getElementById("overlay").style.display = "";
    document.getElementById("pnlAds").style.display = "none";
document.getElementById("pnlHelp").style.display = "";

} // end function Help

function SelectProperty(propertyid)
{
document.getElementById("imgFinal").src = "/thumb.ashx?id="+propertyid+"&t=s";
document.getElementById("property_enlarged").src = "/thumb.ashx?id="+propertyid+"&t=sm";

document.getElementById("hidPropertyId").value = propertyid;

document.getElementById("txtSubject").value = arrProperties[propertyid]["name"];

document.getElementById("pnlAddress").innerHTML = "<b>"+arrProperties[propertyid]["name"]+"</b><br />";

document.getElementById("pnlAddress").innerHTML += arrProperties[propertyid]["address"];

if(arrProperties[propertyid]["address2"].length > 0)
document.getElementById("pnlAddress").innerHTML += " " + arrProperties[propertyid]["address2"];

if (arrProperties[propertyid]["suburb"].length > 0)
document.getElementById("pnlAddress").innerHTML += "<br />" + arrProperties[propertyid]["suburb"];

document.getElementById("pnlAddress").innerHTML += " " + arrProperties[propertyid]["state"] + " " + arrProperties[propertyid]["postcode"];

document.getElementById("pnlClient").innerHTML = "<a target=\"_blank\" href=\""+arrProperties[propertyid]["website"]+"\"><img border=\"0\" src=\"/images/clients/IMG_"+arrProperties[propertyid]["clientid"]+".jpg\" alt=\""+arrProperties[propertyid]["company"]+"\" /></a>";

if(arrProperties[propertyid]["ads"]=="True")
{
document.getElementById("pnlAds").style.display = "";
//document.getElementById("pnlAds").innerHTML =
// "<script type=\"text/javascript\"> if(fadeimages.length>0) new fadeshow(fadeimages, 400, 98, 0, 10000, 1, \"R\");</script>";

} // end if
else
document.getElementById("pnlAds").style.display = "none";
//else
// document.getElementById("pnlAds").innerHTML = "";

LoadProperty();
LoadNormal(true);
CloseDashboard();
LoadAerial(propertyid);

} // end function SelectProperty

function dTHover(id)
{
document.getElementById(id).className = "dthumb-hover";

} // end function dtHover

function dTOut(id)
{
document.getElementById(id).className = "dthumb";

} // end function dTOut

function HoverBtn(id, className)
{
document.getElementById(id).className = className + "-hover";

} // end function HoverBtn

function LeaveBtn(id, className)
{
document.getElementById(id).className = className;

} // end function LeaveBtn

function SendEmail(image_no)
{
email = encodeMyHtml(document.getElementById("txtEmail").value);
sub = encodeMyHtml(document.getElementById("txtSubject").value);
msg = encodeMyHtml(document.getElementById("txtMessage").value);

if(image_no == 1)
img = encodeMyHtml(document.getElementById("image").src);
else
img = encodeMyHtml(document.getElementById("imageRight").src);

xmlHttp = GetXmlHttpObject();

if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==4)
{
//alert(xmlHttp.responseText);
document.getElementById("pnlEmailForm").style.display = "none";
document.getElementById("pnlEmailResult").style.display = "";

} // end if
}

xmlHttp.open("GET.html","/sendemail.ashx?e="+email+"&s="+sub+"&m="+msg+"&i="+img,true);
xmlHttp.send(null);

} // end function SendEmail

function SendHelpEmail()
{
email = encodeMyHtml(document.getElementById("txtHelpRecipient").value);
sub = encodeMyHtml(document.getElementById("txtHelpSubject").value);
msg = encodeMyHtml(document.getElementById("txtHelpMessage").value);

xmlHttp = GetXmlHttpObject();

if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;

} // end if

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==1)
{

} // end if
if(xmlHttp.readyState==4)
{
//alert(xmlHttp.responseText);
document.getElementById("pnlHelpEmailForm").style.display = "none";
document.getElementById("pnlHelpEmailResult").style.display = "";

} // end if
}

xmlHttp.open("GET.html","/sendhelpemail.ashx?e="+email+"&s="+sub+"&m="+msg,true);
xmlHttp.send(null);

} // end function SendEmail

function encodeMyHtml(encodedHtml)
{
encodedHtml = escape(encodedHtml);
encodedHtml = encodedHtml.replace(/\//g,"%2F");
encodedHtml = encodedHtml.replace(/\?/g,"%3F");
encodedHtml = encodedHtml.replace(/=/g,"%3D");
encodedHtml = encodedHtml.replace(/&/g,"%26");
encodedHtml = encodedHtml.replace(/@/g,"%40");
return encodedHtml;

} // end function

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function showDebug(msg)
{
if(debug)
{
debug_count += 1;
document.getElementById("_debug").innerHTML += debug_count + "." + msg + "<br />";

} // end if

} // end function ShowDebug

function show()
{
var Digital=new Date();
//var day = Digital.toString;
var date = Digital.getDate();
var month = Digital.getMonth()+1;
var year = Digital.getYear()+1;
var hours=Digital.getHours();
var minutes=Digital.getMinutes();
var seconds=Digital.getSeconds();
var dn="AM";

if (hours>12)
{
dn="PM"
hours=hours-12;

} // end if

if (hours==0)
hours=12;

if (minutes<=9)
minutes="0"+minutes;

if (seconds<=9)
seconds="0"+seconds;

//document.getElementById("lblDTime").innerHTML = day + " " + date + " " + month + " " + year + " " + hours + ":" + minutes + ":" + seconds + " " + dn;
// document.getElementById("lblDTime").innerHTML = Digital.toLocaleString();
setTimeout("show()",1000);

} // end function Show