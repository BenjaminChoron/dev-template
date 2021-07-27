const { User, Message, Project, Article } = require('../models');
const { compare, hashSync } = require("bcrypt");

const adminController = {
    signupPage: (req, res) => {
        res.render('back/signup');
    },

    signupAction: async (req, res) => {
        if(!req.body.password || req.body.password !== req.body.passwordConfirm) return res.redirect('/signup');
        try {
            const user = await User.findOne({
                where: {
                    pseudo: req.body.pseudo
                }
            });

            if(user) return res.redirect('/signup');

            const userData = {
                pseudo: req.body.pseudo,
                password: hashSync(req.body.password, 10),
                first_name: req.body.first_name,
                last_name: req.body.last_name
            }

            User.create(userData).then(user => {
                res.redirect('/login');
            });
            
        } catch(error) {
            console.log(error);
        }
    },

    loginPage: (req, res) => {
        res.render('back/login');
    },
    
    loginAction: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    pseudo: req.body.pseudo
                }
            });
            if(user) {
                const result = await compare(req.body.password, user.password);
                if(result) {
                    req.session.user = {
                        id: user.id,
                        pseudo: user.pseudo,
                        first_name: user.first_name,
                        last_name: user.last_name
                    }
                    res.redirect('/admin');
                } else {
                    res.redirect('/login');
                }
            } else {
                res.redirect('/login');
            }
        } catch(error) {
            console.log(error);
        }
    },

    adminPage: async (req, res) => {
        try {
            const messages = await Message.findAll();
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });
            const projects = await Project.findAll();
            const articles = await Article.findAll();

            res.render('back/backoffice', { messages, notSeen, projects, articles });
        } catch(error) {
            console.log(error);
        }
    }
};

module.exports = adminController;