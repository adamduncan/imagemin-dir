const path = require("path");
const imagemin = require("imagemin");
const globby = require("globby");

module.exports = async (input = [], options = {}) => {
  const files = await globby(input, { onlyFiles: true });
  return Promise.all(
    files.map(async file => {
      try {
        const { destination } = options;
        const fileParts = file.split(path.sep);
        const outputDestination = path.join(
          destination,
          fileParts.slice(1, fileParts.length - 1).join(path.sep)
        );
        return await imagemin([file], {
          ...options,
          destination: outputDestination
        });
      } catch (err) {
        err.message = `Error occurred when handling file: ${file}\n\n${err.stack}`;
        throw err;
      }
    })
  );
};
