const multer = require('multer');
const { uuid } = require('uuidv4'); 

const serverPath = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => {
        const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        callback(null, uuid() + ext);
    }
});

const upload = multer({ storage: serverPath });

module.exports = upload;
