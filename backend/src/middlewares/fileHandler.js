import multer from "multer";
import path from "path";
import moment from "moment";

//configuring multer storage for images
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      moment(Date.now()).format("DD_MM_YYYY_hh_mm_ss");
    cb(null, fileName + fileExt);
  },
});

//Filtering csv  file 
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: csvFilter,
  limits: { fileSize: 1000000 }, 
});

const formOnly = multer();

const uploadFile = upload.single("file");
const form = formOnly.none();

export default { uploadFile, form };
