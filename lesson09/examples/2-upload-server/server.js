const express = require("express");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use("/public", express.static("public"));

// configure multer

const storage = multer.diskStorage({
  dest: path.join(__dirname, "tmp"),
  filename: function (req, file, cb) {
    cb(null, nanoid() + file.originalname);
  },
});

const upload = multer({
  storage,
  // can set limits
  limits: {
    // fileSize: 1, // in bytes
  },
});

// upload one file
app.post("/api/images", upload.single("image"), async (req, res, next) => {
  try {
    // console.log("uploading from front");
    const { file } = req;
    console.log("req.file", file);
    const newPath = path.join(__dirname, "public/images/", file.filename);
    await fs.rename(file.path, newPath);

    return res.status(201).json({
      data: {
        file,
      },
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    console.error("Got error:", error.name, error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

// upload many files
app.post("/api/images2", upload.array("image"), async (req, res, next) => {
  try {
    //
    const { files } = req;
    console.log("req.files", files);

    for (const file of files) {
    }

    // handle files

    // const newPath = path.join(__dirname, "public/images/", file.filename);
    // await fs.rename(file.path, newPath);

    return res.status(201).json({
      data: {
        ok: true,
      },
    });
  } catch (error) {
    console.error("Got error:", error.name, error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
});

app.post(
  "/api/images3",
  upload.fields([
    {
      name: "image1",
      maxCount: 2,
    },
    {
      name: "image2",
    },
  ]),
  async (req, res, next) => {
    try {
      return res.status(201).json({
        data: {
          ok: true,
        },
      });
    } catch (error) {
      console.error("Got error:", error.name, error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
