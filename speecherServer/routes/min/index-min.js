var express=require("express"),router=express.Router(),session=require("express-session"),facebook=require("./snsLogin");router.use(session({secret:"Soma",resave:!1,saveUninitialized:!0})),router.get("/",function(e,r){r.render("index",{title:"Express"})}),router.get("/textlist",function(e,r){r.render("textlist",{title:"Express"})}),router.get("/login/facebook",facebook.facebookLogin),module.exports=router;