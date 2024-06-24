class CsvFileManager {

  constructor() {
    // Initialize localforage instance if needed
    this.localforage = localforage;
  }

  async generateHash(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  async storeCsvFile(file) {
    const hash = await this.generateHash(file);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvContent = event.target.result;
      try {
        await this.localforage.setItem(hash, csvContent);
        console.log('File stored successfully with hash:', hash);
      } catch (err) {
        console.error('Error storing the file:', err);
      }
    };

    reader.readAsText(file);
  }

  async getCsvFile(hash) {
    try {
      const csvContent = await this.localforage.getItem(hash);
      if (csvContent) {
        console.log('File content:', csvContent);
        // Process the CSV content as needed
      } else {
        console.log('File not found for hash:', hash);
      }
    } catch (err) {
      console.error('Error retrieving the file:', err);
    }
  }

}
