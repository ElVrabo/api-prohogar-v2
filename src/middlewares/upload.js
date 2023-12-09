import path from "path";
import multer from "multer";



let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    /*Los archivos se guardaran en una carpeta llamada uploads que esta en el directorio raiz*/ 
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    /*Aqui se renombrara el nombre del campo + _ + la fecha actual y el nobre original 
    del archivo que basicamente es su extension jpg,png,etc*/
    cb(null, file.fieldname + "_" + Date.now() + ext);
  },
});

export let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    /*Si el archivo es de tipo png,jpeg o jpg entonces se va a guardar en la bd*/
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      callback(null, true);
    } else {
      /*Si no, entonces no se guardara*/
      callback(null, false);
    }
  },
  /*Los archivos que se pueden subir solo seran de 2mb*/
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});