const express = require("express");
const itemModal = require("../modals/importmodal");
const router = express.Router();

router.get("/", (req, res)=> {
    importModal.find().then((itemData)=> {
        res.status(200).send({item: itemData});
    });
});
router.post("/contactlist", (req, res)=> {
    importModal.insertMany(req.body.items).then((itemData)=> {
        res.status(200).send("Data Added Successfully");
    });
});

module.exports = router;