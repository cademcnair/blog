const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const keys = require('./keys');
const { execSync } = require('child_process');
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
    await sequelize.sync();

    if(!await User.findOne({where:{username:keys.admin.user}})){
        await User.create({
            username:keys.admin.user,
            passcode:keys.admin.passcode,
            email:keys.admin.email,
            mail:false,
            comments:"[]",
        })
    }

    app.listen(4000)
}

app.use(express.json())
app.use(cors())  

main()

app.get('/:gistid/gist/',async function(req,res){
    res.send(`
        <html>
            <head>
                <title>Gist ${req.params.gistid}</title>
            </head>
            <body>
            <script src="https://gist.github.com/codingtuba/${req.params.gistid}.js"></script>
            </body>
        </html>
    `)
})
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
app.get('/:postid/',async function(req, res){
    try{
        let post=await Post.findOne({where:{id:req.params.postid}});
        post.comments=JSON.parse(post.comments);
        post.categories=JSON.parse(post.categories);
        post.content=JSON.parse(post.content);
        res.json(post)
    }catch(e){res.status(404).send("Post not found")}
})
app.delete('/:postid/',async function(req, res){
    if(req.body.passcode){
        if(req.body.passcode===keys.admin.passcode){
            await Post.destroy({where:{id:req.params.postid}});
            res.send("Post deleted")
        }else{
            res.status(403).send("Wrong passcode")
        }
    }else{res.status(406).send("No passcode")}
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
app.post("/post/create/", async function (req, res) {
    if (objectkeys(req.body, ['title', 'content', 'categories', 'description', 'sideimage', 'headerimage', 'passcode'])) {
        if(req.body.passcode==keys.admin.passcode){
            let post=await Post.create({
                title:req.body.title,
                content:JSON.stringify(req.body.content),
                categories:JSON.stringify(req.body.categories),
                description:req.body.description,
                sideimage:req.body.sideimage,
                headerimage:req.body.headerimage,
                comments:"[]"
            })
            post.comments=[]
            res.json(post)
        }else{res.status(401).send("Wrong passcode")}
    }else{res.status(406).send("Missing parameters")}
})