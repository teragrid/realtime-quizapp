const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const { S3Client } = require('@aws-sdk/client-s3');

dotenv.config();

const region = "ap-southeast-1";
const bucket = "mock_bucket";

const s3 = new S3Client({
  region,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const { updateProfile, detailProfile } = require('../../controllers/ProfileController');
const { validateUpdateProfile } = require('../../middlewares/validators/Profile/updateValidator');

const router = express.Router();

router.post('/profile', upload.fields([
  { name: 'image', maxCount: 1 },
]), validateUpdateProfile, updateProfile);
router.get('/profile', detailProfile);

module.exports = router;
