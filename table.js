/*
*
* Author: Jagmeet Singh Khanuja 
* Mail: jagmeetsingh.work@gmail.com
* Data Created: Sept 12, 2018
* Javascript to create a table out of JSON
* Customized
* DO NOT USE WITHOUT REFERENCE
*
*/

var jq = document.createElement("script");

jq.addEventListener("load", get_table); // pass my hoisted function
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector("head").appendChild(jq);

function get_table(query_code){
		if(hasGrid("t1") ){
			TF_RemoveFilterGrid("t1");	
		}
		$("#_download").hide();
		$("#t1").empty();
		var env = $("#env").val();
        var http = new XMLHttpRequest();	
		
		http.open("GET", "/get_table" + env + query_code, true);
		
        http.setRequestHeader("Content-type", "application/json");
        //http.setRequestHeader("Content-length", params.length);
        //http.setRequestHeader("Connection", "close");
        http.onreadystatechange = function() {
        console.log('onreadystatechange');
        if (http.readyState == 4 && http.status == 200) {
            console.log(JSON.stringify(http.responseText));
			console.log('pasting data of cycle');
            var data = JSON.parse(http.responseText);
			$("#_json").val(http.responseText);
			$("#_download").show();
			//For table Headers
			var headers = "<thead id=\"headers\"> <tr>";
			for (x in data[0]) {
				headers += "<th>" + x + "</th>";
			}
			headers += "</tr></thead>";
			$('#t1').append(headers);


			//For table rows (data)
			$('#t1').append("<tbody id=\"t1body\">");
			for (var i =0; i<data.length; i++){
				var rowEntry = "<tr class='rowData'>"
				for (x in data[i]){
					if (x == "BAN_STATUS"){
						switch (data[i][x]) {
							case "O":
								rowEntry += "<td> Open </td>";
								break;
							case "C":
								rowEntry += "<td> Cancelled </td>";
								break;
							case "T":
								rowEntry += "<td> Tentative </td>";
								break;
							default:
								rowEntry += "<td>"+data[i][x]+"</td>";
								break;
						}
						continue;
					}
					if (x == "ACCOUNT_TYPE"){
						switch (data[i][x]) {
							case "B":
								rowEntry += "<td>Business</td>";
								break;
							case "I":
								rowEntry += "<td>Individual</td>";
								break;
							case "G":
								rowEntry += "<td>Government</td>";
								break;
							default:
								rowEntry += "<td>"+data[i][x]+"</td>";
								break;
						}
						continue;
					}
					if (x == "ACCOUNT_SUB_TYPE"){
						switch (data[i][x]) {
							case "C":
								rowEntry += "<td>Corporate</td>";
								break;
							case "R":
								rowEntry += "<td>Regular</td>";
								break;
							default:
								rowEntry += "<td>"+data[i][x]+"</td>";
								break;
						}
						continue;
					}

					rowEntry += "<td>"+data[i][x]+"</td>";
				}
				rowEntry += "</tr>";
				$('#t1').append(rowEntry);
				$("#t1body").remove();
			}
			$('#t1').append("</tbody>");
			
			//Applying paging and filters
			
			var t1_Props = {
				paging: true,
				paging_length: 10,
				rows_counter: true,
				rows_counter_text: "Rows:",
				btn_reset: true,
				loader: true,
				loader_text: "Filtering data..."
			};
			if(!hasGrid("t1") ){
			setFilterGrid("t1", t1_Props);
			}
		}
			else {
			console.log('readyState=' + http.readyState + ', status: ' + http.status);
			}
			}
			http.send();
	}
