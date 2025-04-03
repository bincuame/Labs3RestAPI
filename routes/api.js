// var express = require("express");
// var router = express.Router();
const express = require('express');
const router = express.Router();
const { create } = require("hbs");
//them model
const Cars = require("../models/Cars");
const Distributor = require("../models/Distributor");
// const User = require("../models/User");

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
router.delete("/delete-car-id/:id", async (req, res) => {
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


router.post("/add-Distributor", async (req, res) => {
  // lay du lieu
  const data = req.body;
  // tao doi tuong car
  const newDistributor = new Distributor({
    name: data.name,
  });
  const result = await newDistributor.save();

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

router.get("/get-list-Distributor", async (req, res) => {
  try {
      const data = await Distributor.find();
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

router.put("/update-Distributor-Id/:id", async (req, res) => {
  try {
      const {id} = req.params;
      const dataUpdate = req.body;

      const updateDistributor = await Distributor.findByIdAndUpdate(
          id,
          dataUpdate,
          { 
              new: true,
              runValidators: true,
          }
      );

      if(!updateDistributor) {  // Sửa từ updateCar thành updateDistributor
          res.json({
              status: 400,
              message: "update no successfull",
              data: "Not found"  // Sửa error thành thông báo rõ ràng hơn
          })
      } else { 
          res.json({
              status: 200,
              message: "update successfull",
              data: updateDistributor,
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

router.delete("/delete-Distributor-id/:id", async (req, res) => {
  try {
      const { id } = req.params; // Lấy ID sản phẩm từ params\
      // Tìm và xóa sản phẩm theo ID
      const deleteDistributor = await Distributor.findByIdAndDelete(id);
      if (deleteDistributor) {
        res.json({
          status: 200,
          message: "delete success",
          data: deleteDistributor,
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

router.get('/search-Distributor', async (req, res) => {
  try {
    const key = req.query.key; // nhan tu query
    // lay danh sach theo thu tu distributor moi nhat
    const data = await Distributor.find({
      name: { $regex: key, $options: 'i' }, // tim kiem phan tu
    }).sort({ createdAt: -1 }); // sap xep theo thoi gian

    if(data){
      res.json({
        status: 200,
        message: "get list successfull",
        data: data,
      });
    }else{
      res.json({
        status: 400,
        message: "get list no successfull",
        data: error,
      });
    }
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
