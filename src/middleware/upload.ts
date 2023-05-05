import multer from "multer";
// import { v4 as uuid } from "uuid"

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './uploads')
//     }, 
//     filename: (req, file, callback) => {
//         callback(null, uuid() + '.png')
//     }
// })

// export const upload = multer({ storage })


// import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./uploads")
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
})

export const upload = multer({ storage })




// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public");
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split("/")[1];
//         cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//     },
// });



// export const upload = multer({ storage })