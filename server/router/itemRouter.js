import express from "express";
import { getAllItems, addItemToList, deleteItemFromList, getItemById, updateItemInList, updateUserCart, getUserCartData, buyProductsFromCart } from "../controllers/itemController.js";
import multer from "multer";
import path from "path";
import { authorization } from "../middleware/authorization.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });
const router = express();

router.use(authorization);

router.post("/getAllItems", getAllItems);   
router.post("/getItemById", getItemById);                  
router.post("/addProduct/", upload.single('image'), addItemToList);    
router.put("/updateProduct", upload.single('image'), updateItemInList);       
router.delete("/deleteProduct", deleteItemFromList); 
router.post("/updateUserCart", updateUserCart);  
router.get("/getCartdata/:userId", getUserCartData); 
router.put("/buyProducts", buyProductsFromCart);   

export default router;
