const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const keys = require('./keys/');
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
class Category extends Model {}
class Post extends Model {}
class Comment extends Model {}

User.init({
    username:DataTypes.STRING,
    passcode:DataTypes.STRING,
    email:DataTypes.STRING,
    mail:DataTypes.BOOLEAN,
})
Category.init({
    name:DataTypes.STRING,
    description:DataTypes.STRING,
    posts:DataTypes.STRING,
    comments:DataTypes.STRING,
})
Post.init({
    title:DataTypes.STRING,
    headerimage:DataTypes.STRING,
    content:DataTypes.STRING,
    categories:DataTypes.STRING,
    comments:DataTypes.STRING,
})
Comment.init({
    content:DataTypes.STRING,
    post:DataTypes.INTEGER,
    user:DataTypes.INTEGER,
})

async function main(){
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(4000)
}

app.use(express.json())
app.use(cors())  

main()
