const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const ext = path.extname(req.url);
  let contentType = "text/html";
  if (ext === ".jpg" || ext === ".jpeg") {
    contentType = "image/jpeg";
  } else if (ext === ".png") {
    contentType = "image/png";
  }

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

  const selectedSubPath = subPathList.international;

  if (req.url.includes("/images-team-logos/")) {
    const imagePath = `D:/CricketData/CricketersPhotos/Teams/${selectedSubPath
      ?.replace("-test", "")
      ?.replace("under-19", "international")}/${req.url.split("/")[2]}`;

    console.log(imagePath);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("<h1>404 Not Found</h1>");
        return;
      }

      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  } else if (req.url.includes("/images/")) {
    const imagePath = `D:/CricketData/CricketersPhotos/Players/${selectedSubPath}/${
      req.url.split("/")[2]
    }/${req.url.split("/")[3]}`;

    console.log(imagePath);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("<h1>404 Not Found</h1>");
        return;
      }

      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  } else if (req.url.includes("/textures/")) {
    const imagePath = `D:/CricketData/CricketersPhotos/Textures/${
      req.url.split("/")[2]
    }`;

    console.log(imagePath);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("<h1>404 Not Found</h1>");
        return;
      }

      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  } else if (req.url.includes("/videos/fireworks")) {
    const videoPath = `D:/CricketData/CricketVideos/fireWorks.mp4`;

    fs.readFile(videoPath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("<h1>404 Not Found</h1>");
        return;
      }

      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  } else if (req.url.includes("/videos/intro")) {
    const videoPath = `D:/CricketData/CricketVideos/ChannelIntro.mp4`;

    fs.readFile(videoPath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("<h1>404 Not Found</h1>");
        return;
      }

      res.setHeader("Content-Type", contentType);
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3012, () => {
  console.log("Server is running on http://localhost:3012");
});
