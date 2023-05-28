/*class XMLToJsonConverter {
  static async convertFileToJSON(filePath) {
    try {
      const xmlData = await promisify(fs.readFile)(filePath, 'utf8');
      const jsonData = await parseString(xmlData);
      return jsonData;
    } catch (error) {
      console.error('Error occurred while converting XML to JSON:', error);
      return null;
    }
  }
}

module.exports = XMLToJsonConverter;*/