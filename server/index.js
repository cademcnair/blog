const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const keys = require('./keys');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.email.user,
        pass: keys.email.pass
    }
});
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const objectkeys=(object,keys)=>{
    let objectkeys=Object.keys(object);
    let includes=keys.every(key=>objectkeys.includes(key));
    return includes;
}

class User extends Model {}
class Catergory extends Model {}
class Post extends Model {}
class UserComment extends Model {}

User.init({
    username:DataTypes.STRING,
    passcode:DataTypes.STRING,
    email:DataTypes.STRING,
    mail:DataTypes.BOOLEAN,
    comments:DataTypes.STRING,
},{sequelize})
Catergory.init({
    name:DataTypes.STRING,
    description:DataTypes.STRING,
    posts:DataTypes.STRING,
    comments:DataTypes.STRING,
},{sequelize})
Post.init({
    title:DataTypes.STRING,
    sideimage:DataTypes.STRING,
    headerimage:DataTypes.STRING,
    content:DataTypes.STRING,
    categories:DataTypes.STRING,
    comments:DataTypes.STRING,
    description:DataTypes.STRING,
},{sequelize})
UserComment.init({
    content:DataTypes.STRING,
    post:DataTypes.INTEGER,
    user:DataTypes.INTEGER,
},{sequelize})

async function main(){
    await sequelize.authenticate();
    await sequelize.sync({force:true});

    await Post.destroy({
        where:{},
        truncate:true,
    })
    await Catergory.create({
        name: "tiny",
        description: "tiny",
        posts:"[2]",
        comments:"[]",
    })
    await Catergory.create({
        name: "large",
        description: "large",
        posts:"[1,3]",
        comments:"[]",
    })
    await Catergory.create({
        name: "spaces",
        description: "spaces",
        posts:"[3]",
        comments:"[]",
    })
    await Post.create({
        title:"Hello world",
        sideimage:"https://picsum.photos/200/300/",
        headerimage:"https://picsum.photos/200/300/",
        content:"[]",
        categories:"[]",
        comments:"[]",
        description:"tdyfuyvhkbjluiyfutd56s4d5rytcuvhjbkjvyuftd56s4wsd5rytcgjvcutydr6s4w5s6rdytcgvjhyuctd56s4wsd5rytfuvyifu6d7e5wdtufyvuftd657ew67dtyufyvjufdt675ewdtufyvu6r7e5gdrshtfjygukhgyftdyrtfyguhijoihugfytdfugihojpuiyutydtryfugiyou6d",
    })
    await Post.create({
        title:"Hello world",
        sideimage:"https://picsum.photos/200/320/",
        headerimage:"https://picsum.photos/200/320/",
        content:"[]",
        categories:"[]",
        comments:"[]",
        description:"tdyfuyvhkbjluiyfutd56s4d5rytcuvhjbkjvyuftd56s4wsd5rytcgjvcu",
    })
    await Post.create({
        title:"Hello world",
        sideimage:"https://picsum.photos/200/350/",
        headerimage:"https://picsum.photos/200/350/",
        content:"[]",
        categories:"[]",
        comments:"[]",
        description:"r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr r rr rrr rrrr ",
    })
    await User.create({
        username:keys.admin.user,
        passcode:keys.admin.passcode,
        email:keys.admin.email,
        mail:false,
        comments:"[]",
    })

    app.listen(4000)
}

app.use(express.json())
app.use(cors())  

main()

app.get('/',async function(req, res){
    let [posts,catergories]=[await Post.findAll(),await Catergory.findAll()];
    posts.forEach(post=>{
        post.comments=JSON.parse(post.comments);
        post.categories=JSON.parse(post.categories);
        post.content=JSON.parse(post.content);
    })
    catergories.forEach(Catergory=>{
        Catergory.posts=JSON.parse(Catergory.posts);
        Catergory.comments=JSON.parse(Catergory.comments);
    })
    res.json({
        posts:posts,
        catergories:catergories
    })
})

app.post("/register/", async function(req, res){
    if(objectkeys(req.body,['username','passcode','email'])){
        if(!(await User.findOne({where:{username:req.body.username}}))){
            if(!(await User.findOne({where:{email:req.body.email}}))){
                let user=await User.create({
                    username:req.body.username,
                    passcode:req.body.passcode,
                    email:req.body.email,
                    mail:false,
                    comments:"[]"
                })
                user.comments=[]
                res.json(user)        
            }else{res.status(409).send("Email already taken")}
        }else{res.status(409).send("Username already taken")}
    }
})
app.post("/login/", async function (req, res) {
    if (objectkeys(req.body, ['username', 'passcode'])) {
        let user = 
            await User.findOne({ where: { username: req.body.username } })||
            await User.findOne({ where: { email: req.body.username } });
        if (user) {
            if (user.passcode === req.body.passcode) {
                user.comments=JSON.parse(user.comments);
                res.json(user)
            } else {
                res.status(401).send("Wrong passcode")
            }
        } else {
            res.status(404).send("User not found")
        }
    }
})