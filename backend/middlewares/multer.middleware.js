import multer from "multer";

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    console.log("File received - fieldname:", file.fieldname, "mimetype:", file.mimetype, "filename:", file.originalname);
    // Accept PDF files by content-type OR by file extension
    const isPdf = file.mimetype === "application/pdf" || 
                  file.mimetype === "application/octet-stream" ||
                  file.mimetype === "text/plain" ||
                  file.originalname.endsWith(".pdf");
    
    if (isPdf) {
        cb(null, true);
    } else {
        cb(new Error(`Only PDF files are allowed, got: ${file.mimetype}`), false);
    }
};
const uploadPdf = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5000000
    }
})

export default uploadPdf