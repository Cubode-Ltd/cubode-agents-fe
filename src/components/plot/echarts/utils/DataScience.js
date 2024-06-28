class DataScience {

    static sum(values) {
        return values.reduce((a, b) => a + b, 0);
    }

    static mean(values) {
        return DataScience.sum(values) / values.length;
    }

    static median(values) {
        values.sort((a, b) => a - b);
        const mid = Math.floor(values.length / 2);
        return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
    }

    static min(values) {
        return Math.min(...values);
    }

    static max(values) {
        return Math.max(...values);
    }
}

export default DataScience;