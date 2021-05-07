const fs = require('fs');
const form = document.getElementById('form');
const inputLocation = document.getElementById('location');

const splitString = (stringToSplit, separador) => {
  const result = stringToSplit.split(separador);
  const firstIndex = result[0];
  const lastIndex =  result[result.length - 1];

  return [firstIndex, lastIndex];
};

const parseName = (name, format) => {
  const formatName = splitString(format, '.')[1];
  return `${name}.${formatName}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileLocation = inputLocation.value;

  try {
    const files = fs.readdirSync(fileLocation);

    files.map(file => {
      const [firstIndex, lastIndex] = splitString(file, '_');
      if (!firstIndex.match(/\D/)) {
        const name = parseName(firstIndex, lastIndex);
        const oldPath = `${fileLocation}\\${file}`;
        const newPath = `${fileLocation}\\${name}`;
        fs.renameSync(oldPath, newPath);
      }
    })
  } catch (e) {
    console.log(e);
  }
});
