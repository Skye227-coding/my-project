const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping-cart-auth',{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).catch(error=>{
    console.log(error)
})

const UserSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    password:{type:String,
      set(val){
          return require('bcrypt').hashSync(val,10)
      }
    },
    address:{type:String},
    email:{type:String,unique:true}
})

const User=mongoose.model('User',UserSchema)
module.exports={ User }