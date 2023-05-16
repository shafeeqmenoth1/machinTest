import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    
    destination:function(req,file,cb){
        console.log("file Uploadlllled");
        console.log();
        cb(null, "./public/uploads")
    },
    filename:function(req,file,cb){
      
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
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




