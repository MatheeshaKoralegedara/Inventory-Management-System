const router = require("express").Router();
const controller = require("../controllers/productController");

router.post("/", controller.addProduct);
router.get("/", controller.getProducts);
router.put("/:id", controller.updateStock);
router.delete("/:id", controller.deleteProduct);

module.exports = router;