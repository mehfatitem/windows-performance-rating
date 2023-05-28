const { promisify } = require('util');
const parseString = promisify(require('xml2js').parseString);
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const directoryPath = 'C:/Windows/Performance/WinSAT/DataStore';

class SystemRatingReader {
  static async processFiles() {
    try {
      const files = await promisify(fs.readdir)(directoryPath);
      const xmlFiles = files.filter(file => file.includes('Formal.Assessment') && file.endsWith('.xml'));

      if (xmlFiles.length === 0) {
        console.log('No XML files matching the pattern found.');
        return;
      }

      const latestFile = xmlFiles[xmlFiles.length - 1];
      const filePath = path.join(directoryPath, latestFile);

      const data = fs.readFileSync(filePath);
      let utf8Data = iconv.decode(data, 'utf16');

      const regex = /<WinSPR>[\s\S]*?<\/WinSPR>/i;
      const match = utf8Data.match(regex);

      if (match) {
        const extractedXml = match[0];
        utf8Data = extractedXml;
      } else {
        console.log('No matching XML string found.');
      }


      return new Promise((resolve, reject) => {
        const jsonData =  parseString(utf8Data);
        setTimeout(() => {
          resolve(jsonData); // Resolve the promise with the result
        }, 2000);
      });

    } catch (error) {
      console.error('Error occurred while processing the XML files:', error);
    }
  }
}

module.exports = SystemRatingReader;