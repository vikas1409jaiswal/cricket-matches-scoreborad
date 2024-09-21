const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types"); // Install via npm: npm install mime-types

// Helper function to handle file responses
const serveFile = (filePath, res) => {
  const ext = path.extname(filePath);
  const contentType = mime.lookup(ext) || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("<h1>404 Not Found</h1>");
      return;
    }
    res.setHeader("Content-Type", contentType);
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const subPathList = {
    international: "international",
    "international-test": "international-test",
    "international-women": "international-women",
    "international-women-test": "international-women-test",
    bbl: "bbl",
    "super-smash": "super-smash",
    sa20: "sa20",
    bpl: "bpl",
    "under-19": "under-19",
    psl: "psl",
    wpl: "wpl",
    ipl: "ipl",
    lpl: "lpl",
    mlc: "mlc",
    cpl: "cpl",
  };

  const selectedSubPath = subPathList.international; // Select path here based on logic

  // Serve team logos
  if (req.url.includes("/images-team-logos/")) {
    const imagePath = `D:/CricketData/CricketersPhotos/Teams/${selectedSubPath
      ?.replace("-test", "")
      ?.replace("under-19", "international")}/${req.url.split("/")[2]}`;

    console.log(imagePath);
    serveFile(imagePath, res);

    // Serve player images
  } else if (req.url.includes("/images/")) {
    const imagePath = `D:/CricketData/CricketersPhotos/Players/${selectedSubPath}/${
      req.url.split("/")[2]
    }/${req.url.split("/")[3]}`;

    console.log(imagePath);
    serveFile(imagePath, res);

    // Serve texture files
  } else if (req.url.includes("/textures/")) {
    const imagePath = `D:/CricketData/CricketersPhotos/Textures/${
      req.url.split("/")[2]
    }`;
    console.log(imagePath);
    serveFile(imagePath, res);

    // Serve video files
  } else if (req.url.includes("/videos/fireworks")) {
    const videoPath = `D:/CricketData/CricketVideos/fireWorks.mp4`;
    console.log(videoPath);
    serveFile(videoPath, res);
  } else if (req.url.includes("/videos/intro")) {
    const videoPath = `D:/CricketData/CricketVideos/ChannelIntro.mp4`;
    console.log(videoPath);
    serveFile(videoPath, res);

    // Handle 404 for unsupported paths
  } else {
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3012, () => {
  console.log("Server is running on http://localhost:3012");
});
