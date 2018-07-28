const WriteStream = require('fs').createWriteStream;
const archiver = require('archiver');

module.exports = function(input, output) {
  return new Promise((resolve, reject) => {
    console.log('Started zipping...');

    const outputStream = new WriteStream(output);
    const archive = archiver('zip', {
      zlib: {level: 9},
    });

    archive.pipe(outputStream);

    archive
      .directory(input, false)
      .finalize()
      .then(() => {
        console.log(`Finished zipping: ${archive.pointer()} total bytes`);
        resolve(archive);
        return archive;
      })
      .catch((err) => { reject(err); });
  });
};
