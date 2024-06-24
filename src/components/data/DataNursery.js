import localforage from 'localforage';


class DataNursery {

  constructor() {
    this.hashes2data = localforage.createInstance({
      name: 'dataNursery',
      storeName: 'hashes2data'
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

  async storeCsvFile(file) {
    const hash = await this.generateHash(file);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const csvContent = event.target.result;
      try {
        await this.hashes2data.setItem(hash, csvContent);
        await this.name2hash.setItem(file.name, hash);
        console.log('File stored successfully with hash:', hash);
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

}

const dataNursery = new DataNursery();
export default dataNursery;
