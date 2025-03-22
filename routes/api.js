var express = require("express");
var router = express.Router();
const { create } = require("hbs");
//them model
const Cars = require("../models/Cars");

// Them 
router.post("/add-cars", async (req, res) => {
  // lay du lieu
  const data = req.body;
  // tao doi tuong car
  const newCar = new Cars({
    name: data.name,
    color: data.color,
    price: data.price,
    status: data.status,
    image: data.image,
    description: data.description,
  });
  const result = await newCar.save();

  if (result) {
    res.json({
      status: 200,
      message: "add sucessfull",
      data: result,
    });
  } else {
    res.json({
      status: 400,
      message: "add no sucessfull",
      data: "error",
    });
  }
});
// Xem 
router.get("/get-list-cars", async (req, res) => {
    try {
        const data = await Cars.find();
        res.json({
            status: 200,
            message: "get list successfull",
            data: data,
        });
    } catch (error) {
        res.json({
            status: 400,
            message: "get list no successfull",
            data: error,
        })
    }
})
// Cap nhat
router.put("/update-Car-Id/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const dataUpdate = req.body;

        const updateCar = await Cars.findByIdAndUpdate(
            id,
            dataUpdate,
            { 
                new: true, // tra ve san pham da cap nhat 
                runValidators: true, // kiem tra du lieu dau vao theo Schema
            }
        );

        if(!updateCar) {
            res.json({
                status: 400,
                message: "update no successfull",
                data: error,
            })
        }else{ 
            res.json({
                status: 200,
                message: "update successfull",
                data: updateCar,
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: "lỗi",
            data: error,
          });
    }
})
// Xoa 
router.delete("/delete-car-Id/:id", async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID sản phẩm từ params\
        // Tìm và xóa sản phẩm theo ID
        const deleteCar = await Cars.findByIdAndDelete(id);
        if (deleteCar) {
          res.json({
            status: 200,
            message: "delete success",
            data: deleteCar,
          });
        }
      } catch (error) {
        res.json({
          status: 400,
          message: "delete not success",
          data: error,
        });
      }
})

module.exports = router;
