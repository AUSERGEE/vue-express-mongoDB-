var express = require('express');
var router = express.Router();  // 拿到express框架的路由
var mongoose = require('mongoose');
var User = require('./../models/users.js');



// 链接MongoDB数据库,数据库的名称叫dumall
mongoose.connect('mongodb://127.0.0.1:27017/dumall');   // 若是带账号密码的：'mongodb://root:123456@127.0.0.1:27017/dumall'

// 连接成功操作
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success.")
})

// 连接失败操作
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail.")
})

// 连接断开操作
mongoose.connection.on("disconnected",function(){
    console.log("MongoDB connected disconnected.")
})
// 二级路由
// 登录接口
router.post("/login",function(req, res, next){
    // 获取参数
    var param = {
        userName:req.body.userName,
        userPwd:req.body.userPwd
    }
    console.log(param)
    console.log(User.findOne)
    User.findOne(param, function(err,doc){  // 根据用户名密码查找数据库
      console.log(err)
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        }else{
            if(doc){
                console.log(doc)
                res.cookie("userId",doc.userId,{
                    path:'/',
                    maxAge:100*60*60
                });
                res.cookie("userName",doc.userName,{
                  path:'/',
                  maxAge:1000*60*60
                });
                // res.cookie("userName",doc.userName,{
                //    path:'/',
                //    maxAge:1000*60*60
                // });
                // req.session.user = doc;
                res.json({
                    status:"0",
                    msg:'登录成功',
                    result:{
                        userName:doc.userName
                    }
                })
            }else{
                res.json({
                  status:"1",
                  msg:'没有doc'
                })
            }
        }
    })
})


// 登出接口
router.post("/logout",function(req,res,next){
  res.cookie("userId","",{
      path:"/",
      maxAge:-1  // 生命周期
  })
  res.json({
      status:"0",
      msg:'',
      result:''
  })
})

// 校验是否登录
router.get("/checkLogin",function(req,res,next){
  if(req.cookies.userId){
      res.json({
          status:'0',
          msg:'已登录',
          result:req.cookies.userName || ''
      });
  }else{
      res.json({
          status:'1',
          msg:'未登录',
          result:''
      })
  }
})

// 查询当前用户的购物车数据
router.get('/cartList',function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
      if(err){
          res.json({
              status:'1',
              msg:err.message,
              result:''
          });
      }else{
          if(doc){
              res.json({
                  status:'0',
                  msg:'',
                  result:doc.cartList
              })
          }
      }
  })
})

// 购物车删除功能
router.post('/cartDel',function(req,res,next){
    var userId = req.cookies.userId,productId = req.body.productId;
    User.update({
        userId:userId
    },{
        $pull:{
            'cartList':{
                'productId':productId
            }
        }
    },function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'删除成功',
                result:'suc'
            });
        }
    })
});

//修改数量接口
router.post("/cartEdit",function(req,res,next){
    var userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    User.update({             // 查询条件
        "userId":userId,
        "cartList.productId":productId
    },{                      // 修改的数据
        "cartList.$.productNum":productNum,
        "cartList.$.checked":checked
    },function(err,doc){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          });
        }else{
          res.json({
            status:'0',
            msg:'',
            result:'suc'
          });
        }
    });
})

// 查询用户地址接口
router.get("/addressList",function(req,res,next){
    var userId = req.cookies.userId;
    User.findOne({userId:userId},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc.addressList
            })
        }
    })
})


//设置默认地址接口
router.post("/setDefault", function (req,res,next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if(!addressId){
      res.json({
        status:'1003',
        msg:'addressId is null',
        result:''
      });
    }else{
      User.findOne({userId:userId}, function (err,doc) {
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          });
        }else{
          var addressList = doc.addressList;
          addressList.forEach((item)=>{
            if(item.addressId ==addressId){
               item.isDefault = true;
            }else{
              item.isDefault = false;
            }
          });
  
          doc.save(function (err1,doc1) {
            if(err){
              res.json({
                status:'1',
                msg:err.message,
                result:''
              });
            }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:''
                });
            }
          })
        }
      });
    }
  });


  //删除地址接口
router.post("/delAddress", function (req,res,next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    User.update({
      userId:userId
    },{
      $pull:{
        'addressList':{
          'addressId':addressId
        }
      }
    }, function (err,doc) {
        if(err){
          res.json({
              status:'1',
              msg:err.message,
              result:''
          });
        }else{
          res.json({
            status:'0',
            msg:'',
            result:''
          });
        }
    });
  });

  
module.exports = router;