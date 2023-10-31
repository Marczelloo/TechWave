const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const con = require('../../db.js');

// Set up storage and file upload with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.id; // Get user ID from the request parameters
        const userFolderPath = path.join(__dirname, '..', 'public', 'users', userId);

        // Create user folder if it doesn't exist
        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
        }

        cb(null, userFolderPath); // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage: storage });


// Handle file upload using a PUT request
router.post('/:id', upload.single('file'), (req, res) => {
    // File is uploaded. You can access it using req.file
    const uploadedImage = req.file;
    const userId = req.params.id;

    console.log(uploadedImage);

    if (!req.file) {
        return res.status(400).send({
            success: 0,
            info: 'No file uploaded'
        });
    }

    const userIconPath = "http://localhost:8080/" + path.join('public', 'users', userId, uploadedImage.filename);
    const query = "UPDATE users SET icon = ? WHERE id = ?";
    con.query(query, [userIconPath, userId], function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                success: 1,
                info: 'Icon succesfully updated'
            })
        }
    })
});

module.exports = router;
