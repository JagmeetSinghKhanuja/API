/*
*
* Author: Jagmeet Singh Khanuja 
* Mail: emailjagmeetsingh@gmail.com
* Data Created: Sept 12, 2018
* Javascript to convert JSON Data to CSV (Excel)
*
*/

function getCSV() {
		var jsonData = $("#_json").val();
		JSONToCSVConvertor(jsonData, "UserExport", true);
	}

function ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

			for (var i = 0; i < array.length; i++) {
                var line = '';
				for (var index in array[i]) {
                    if (line != '')
					line += ','
                    line += array[i][index];
                }

                str += line + '\r\n';
            }

            return str;
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {     

//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
var CSV = '';    
if (ShowLabel) {
    var row = "";

    for (var index in arrData[0]) {
        row += index + ',';
    }
    row = row.slice(0, -1);
    CSV += row + '\r\n';
}

for (var i = 0; i < arrData.length; i++) {
    var row = "";
    for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
    }
    row.slice(0, row.length - 1);
    CSV += row + '\r\n';
}

if (CSV == '') {        
    alert("Invalid data");
    return;
}   

var link = document.createElement("a");    
link.id="lnkDwnldLnk";

//this will append the anchor tag and remove it after automatic click
document.body.appendChild(link);

var csv = CSV;  
blob = new Blob([csv], { type: 'text/csv' }); 
var csvUrl = window.webkitURL.createObjectURL(blob);
var filename = 'UserExport.csv';
$("#lnkDwnldLnk")
.attr({
    'download': filename,
    'href': csvUrl
}); 

$('#lnkDwnldLnk')[0].click();    
document.body.removeChild(link);
}
