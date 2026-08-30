import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 3 * 1024 * 1024, // 3 MB
  },

  fileFilter: (_req, file, cb) => {
    const isPdfMime = file.mimetype === "application/pdf";
    const isPdfExt = file.originalname.toLowerCase().endsWith(".pdf");

    if (isPdfMime || isPdfExt) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF file is allowed"));
    }
  },
});

export const uploadPdf = upload.single("resume");
