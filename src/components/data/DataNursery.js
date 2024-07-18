import localforage from 'localforage';
import Papa from 'papaparse';

class DataNursery extends EventTarget {

  constructor() {
    super();
    this.hashes2data = localforage.createInstance({
      name: 'dataNursery',
      storeName: 'hashes2data'
    });

    this.hashes2dataRows = localforage.createInstance({
      name: 'dataNursery',
      storeName: 'hashes2dataRows'
    });

    this.hash2columns = localforage.createInstance({
      name: 'dataNursery',
      storeName: 'hashes2columns'
    });

    this.name2hash = localforage.createInstance({
      name: 'dataNursery',
      storeName: 'name2hash'
    });

  }

  async generateHash(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  parseCsv(csvContent) {
    const parsedData = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true
    });
    return parsedData;
  }

  csvToObject(csv) {
    const result = {};
    csv.meta.fields.forEach(field => {
      result[field] = csv.data.map(row => row[field]);
    });
    return result;
  }

  // extractMetadata(csvParsed) {
  //   const metadata = {};

  //   // Column names
  //   metadata['Schema'] = csvParsed.meta.fields;

  //   // Data types of each column
  //   const dataTypes = {};
  //   csvParsed.meta.fields.forEach(field => {
  //     const fieldType = typeof csvParsed.data[0][field];
  //     dataTypes[field] = fieldType === 'object' && csvParsed.data[0][field] === null ? 'null' : fieldType;
  //   });
  //   metadata['Data Types'] = dataTypes;

  //   // Sample (first row)
  //   metadata['Sample'] = csvParsed.data.slice(0, 1);

  //   return metadata;
  // }

  async storeCsvFile(file) {
    const hash = await this.generateHash(file);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvContent = event.target.result;
      const csvParsed = this.parseCsv(csvContent);
      const csvData = this.csvToObject(csvParsed);

      try {
        await this.hashes2data.setItem(hash, csvData);
        await this.hashes2dataRows.setItem(hash, csvParsed.data);
        await this.name2hash.setItem(file.name, hash);
        await this.hash2columns.setItem(hash, csvParsed.meta.fields);

        console.log('File stored successfully with hash:', hash);
        window.dispatchEvent(new CustomEvent('fileStored', { 
          detail: { fileName: file.name, hash } 
        }));

      } catch (err) {
        console.error('Error storing the file:', err);
      }
    };
    reader.readAsText(file);
  }

  async getCsvFileByHash(hash) {
    try {
      const csvContent = await this.hashes2data.getItem(hash);
      if (csvContent) {
        console.log('File content:', csvContent);
      } else {
        console.log('File not found for hash:', hash);
      }
    } catch (err) {
      console.error('Error retrieving the file:', err);
    }
  }

  async getCsvFileRowsByHash(hash) {
    try {
      const csvContent = await this.hashes2dataRows.getItem(hash);
      if (csvContent) {
        console.log('File content:', csvContent);
      } else {
        console.log('File not found for hash:', hash);
      }
    } catch (err) {
      console.error('Error retrieving the file:', err);
    }
  }

  async getCsvFileByName(fileName) {
    try {
      const hash = await this.name2hash.getItem(fileName);
      if (hash) {
        await this.getCsvFileByHash(hash);
      } else {
        console.log('File not found for name:', fileName);
      }
    } catch (err) {
      console.error('Error retrieving the file:', err);
    }
  }

  async getCsvFileRowsByName(fileName) {
    try {
      const hash = await this.name2hash.getItem(fileName);
      if (hash) {
        await this.getCsvFileRowsByHash(hash);
      } else {
        console.log('File not found for name:', fileName);
      }
    } catch (err) {
      console.error('Error retrieving the file:', err);
    }
  }
}

const dataNursery = new DataNursery();
export default dataNursery;
