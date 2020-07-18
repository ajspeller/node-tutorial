const fs = require("fs");
const { clearScreenDown } = require("readline");

// read files
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(`error: `, err);
  }
  console.log(`data: `, data);
  console.log(`data: `, data.toString());
});

console.log(`last line`);

// write
fs.writeFile("./docs/blog1.txt", `hello world`, (err, data) => {
  if (err) {
    console.log(`error: `, err);
  }
  console.log(`file was written`);
});

fs.writeFile("./docs/blog2.txt", `hello world`, (err, data) => {
  if (err) {
    console.log(`error: `, err);
  }
  console.log(`file was written`);
});

// directories
if (!fs.existsSync("./assets")) {
  fs.mkdir(`./assets`, (err) => {
    if (err) {
      console.log("error: ", err);
    }
    console.log("folder created");
  });
} else {
  console.log("this directory already exists");
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log("error: ", err);
    }
    console.log("folder deleted");
  });
}

// delete files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log("error: ", err);
    }
    console.log("file deleted");
  });
}
