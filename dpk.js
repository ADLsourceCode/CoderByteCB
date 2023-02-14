const crypto = require("crypto");

const deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = '0';
    const MAX_PARTITION_KEY_LENGTH = 256;

    if(!event) return TRIVIAL_PARTITION_KEY;

    let candidate = event?.partitionKey ?? crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');

    candidate = typeof candidate === 'string' ? candidate : JSON.stringify(candidate);

    return candidate.length > MAX_PARTITION_KEY_LENGTH ? crypto.createHash('sha3-512').update(candidate).digest('hex') : candidate;
};



module.exports = {
    deterministicPartitionKey
}