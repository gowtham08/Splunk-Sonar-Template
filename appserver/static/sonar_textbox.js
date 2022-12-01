require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {

    
    var alert_id="";
    var CustomRangeRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            return _(["Alert","# OTN","# TOT","# TRT"]).contains(cell.field);
        },
        render: function($td, cell) {
            // Add a class to the cell based on the returned value
            var strCellValue = cell.value;
			console.log("cell value -"+cell.value);
			if (cell.field === "Alert"){
				alert_id=strCellValue.replace(/ /g,"_");
				console.log("alert id type-"+typeof(alert_id),alert_id);
				$td.append(cell.value)
			}
            if (cell.field === "# OTN") {
				//console.log("alert id OTN-"+alert_id);
                var strHtmlInput = "<input type='text' class='table-text-box' value='0' id='OTN__" + alert_id + "'></input>";
                //Add TextBox With Specific Style
                $td.append(strHtmlInput);
            } else if (cell.field === "# TOT") {
				//console.log("alert id TOT-"+alert_id);
                var strHtmlInput = "<input type='text' class='table-text-box' value='0' id='TOT__" + alert_id + "'></input>";
                //Add TextBox With Specific Style
                $td.append(strHtmlInput);
            } else if (cell.field === "# TRT") {
				//console.log("alert id TRT-"+alert_id);
                var strHtmlInput = "<input type='text' class='table-text-box' value='0' id='TRT__" + alert_id + "'></input>";
                //Add TextBox With Specific Style
                $td.append(strHtmlInput);
            }
						                           
        }
    })
	
	$("#save").on('click', function() {
		  console.log("Save is clicled");
		  var Row = document.getElementsByClassName("shared-resultstable-resultstablerow");
		  for(j=0;j<8;j++){
			RowValue=Row[j].innerText;
			console.log("Row values - "+RowValue)  
		  }
		});
	       
    id=["sonar_table"]
   
    for(var i=0;i < id.length;i++){
        console.log("i "+ i)
        console.log("id "+ id[i])
     mvc.Components.get(id[i]).getVisualization(function(tableView) {
         // Add custom cell renderer, the table will re-render automatically.
         tableView.addCellRenderer(new CustomRangeRenderer());
     });
    }
});