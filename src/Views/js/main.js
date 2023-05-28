//#region "variables"
 const client = window.api;
 const blackList = ["CPUSubAggScore" , "LimitsApplied" , "ScoreRaisedDueToHigherPreviousScore" ];
 const headerTitle = ['System Score' , 'Memory Score' , 'Cpu Score' ,'Video Encode Score' ,'Graphics Score' , 'Dx9 SubScore' , 'Dx10 SubScore' , 'Gaming Score' , 'Disk Score'];
 const title = "WINDOWS PERFORMANCE SCORE";
 let tableContent = '';
//#endregion

//#region "click function"
 $("#calculate-rating").click(function() {
      $(document.body).addClass('make_darkness');
      $("#loading").css("display" , "inline");
      tableContent = '';
      $("#result-table").css("display" , "none");
      $("#process").text("Lütfen Bekleyiniz!");
      $(this).prop("disabled" , true);
      client.send('calculate-click', 'Button clicked on the client-side');
      client.receive("calculate-click" , function(event , args) {
      });
 });

 $("#dev-tools").click(function () {
    client.send("dev-tools" , "");
 });

  $("#stop").click(function () {
    clear();
    client.send("kill-process" , "");
 });
//#endregion

//#region "receive process"
client.receive("process" , function(event , args) {   
    clear(); 
    let result = event["result"];
    let message = event["message"];

    if(result === "error") {
      $("#result-table").css("display" , "none");
      alert(message);
    } else if(result === "success") {
      let obj =  message["WinSPR"];
      tableContent = createTable(obj , headerTitle, title , blackList);
      $("#result-table").html(tableContent);
      $("#result-table").css("display" , "inline");
    }
});
//#endregion

 //#region "functions"
 function clear() {
    $("#process").text("");
    $("#calculate-rating").prop("disabled" , false);
    $("#loading").css("display" , "none");
    $(document.body).removeClass('make_darkness');
 }
 //#endregion

