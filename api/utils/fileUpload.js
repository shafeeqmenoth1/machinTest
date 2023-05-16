import multer from "multer"


import path from"path"

multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "./public/uploads")
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.filename + '-' + uniqueSuffix)
    }
})

const fileFilter = (req,file,cb)=>{
    const allowedfileTypes = ["image/jpeg","image/jpg","image/png"]
    if(allowedfileTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const fileUpload = multer({storage,fileFilter})

export default fileUpload




