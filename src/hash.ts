const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'sha512';


const getFileHash = filePath => new Promise((resolve, reject) => {
  const hash = crypto.createHash(algorithm);
  const stream = fs.createReadStream(filePath);

  stream.on('data', (data) => hash.update(data, 'utf8'));
  stream.on('end', () => resolve(hash.digest('hex')));
  stream.on('error', err => reject(err));
});

export { getFileHash };
