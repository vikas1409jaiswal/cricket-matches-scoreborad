const fs = require("fs");
const path = require("path");

const directoryPath = "D:\\CricketData\\CricketersPhotos\\Teams\\international";

function convertImageToBase64(filePath) {
  const imageBuffer = fs.readFileSync(filePath);
  return imageBuffer.toString("base64");
}

function processDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    const base64DataArray = [];

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      // Check if the file is a PNG
      if (path.extname(filePath).toLowerCase() === ".png") {
        const base64Data = convertImageToBase64(filePath);

        // Save Base64 data to a JSON file
        const fileName = path.basename(filePath, ".png");
        base64DataArray.push({
          fileName,
          base64: `data:image/png;base64,${base64Data}`,
        });
      }
    });

    // Save JSON array to a text file
    const outputFilePath = path.join(directory, "base64_data.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(base64DataArray, null, 2));
    console.log(`Base64 data saved to: ${outputFilePath}`);
  });
}

// Start processing the specified directory
processDirectory(directoryPath);
