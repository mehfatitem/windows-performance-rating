const { exec } = require('child_process');
const dateTimeHelper = require("./DateTimeHelper.js");
const systemRatingReader = require("./SystemRatingReader.js")



class WinsatFormalExecutor {

  static executeWinsatCmd = "winsat formal";
  static killWinsatCmd = "taskkill /F /IM winsat.exe";

  static executeWinsatFormal(win) {
    exec(this.executeWinsatCmd, (error, stdout, stderr) => {
      if (error) {
        console.log(`Error executing command: '${this.executeWinsatCmd}'\n${error.message}`);
        win.webContents.send("process", {result : "error" , message : error.message});
      } else {
        console.error('Winsat Formal Başarılı..');
         systemRatingReader.processFiles()
          .then(result => {
            win.webContents.send("process", {result : "success" , message : result});
          })
          .catch(error => {
            win.webContents.send("process", {result : "error" , message : "Hata!"});
            // Handle the error
          });
      }
    });
   } 

   static killWinsatFormal() {
      // Execute the taskkill command to terminate the process
      exec(this.killWinsatCmd, (error, stdout, stderr) => {
        try{
            if (error) {
              console.log(`Error killing winsat formal process: '${this.killWinsatCmd}' \n ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`stderr: ${stderr}`);
              return;
            }
            console.log(`winsat formal process killed successfully`);
        } catch(ex) {
            console.dir(ex);
        }
      });
    }
}


module.exports = WinsatFormalExecutor;