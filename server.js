const {User}=require('./src/models/userBasic')
const express=require('express')
const jwt=require('jsonwebtoken')
const bodyParser = require('body-parser')

const app=express()
const SECRET='youaresocute'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())  
// 注册
app.post('/api/register',async(req,res)=>{
  console.log(req.body.user)
  const user=await User.create({
      username:req.body.username,
      password:req.body.password,
      address:req.body.address,
      email:req.body.email
  })
  res.send(user)
})
// 登录
app.post('/api/login',async(req,res)=>{
    // 先查找该用户名是否存在
    const user=await User.findOne({
        username:req.body.username
    })
    if(!user){
        return res.status(432).send({
            message:'用户名不存在'
        })
    }
    // 再检查密码是否匹配
    const isPasswordValid=require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if(!isPasswordValid){
        return res.status(433).send({
            message:'密码无效'
        })
    }
    // 然后利用jwt生成token
    const token=jwt.sign({
      id:String(user._id),
    },SECRET)
    // 返回user和token,存在了res.data里面
    res.send({
        user,
        token
    })
})
// 定义验证的中间件
const auth=async(req,res,next)=>{
    const raw=String(req.headers.authorization).split(' ').pop()
    console.log("req.headers in middleware:",req.headers.authorization)
    console.log("raw:",raw)
    const {id}=jwt.verify(raw,SECRET)
    req.user=await User.findById(id)
    next()
}
app.get('/api/userprofile',auth,async(req,res)=>{
  return res.send(req.user)
})


app.listen(3000,()=>{
    console.log('http://localhost:3000')
})