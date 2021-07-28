const { User, Message, Project, Article } = require('../models');
const { compare, hashSync } = require("bcrypt");

const adminController = {
    signupPage: (req, res) => {
        res.render('back/signup');
    },

    signupAction: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    pseudo: req.body.pseudo
                }
            });
            
            if(user) { throw 'Ce pseudo existe déjà' };
            if(!req.body.password || req.body.password !== req.body.passwordConfirm) { throw 'Les deux mots de passe ne sont pas identiques' };

            const userData = {
                pseudo: req.body.pseudo,
                password: hashSync(req.body.password, 10),
                first_name: req.body.first_name,
                last_name: req.body.last_name
            }

            const newUser = await User.create(userData);

            res.redirect('/login');
        } catch(error) {
            let body = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                pseudo: req.body.pseudo
            }
            res.render('back/signup', { error, body })
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

            if(!user) { throw 'Identifiant ou mot de passe incorrecte' };

            const result = await compare(req.body.password, user.password);

            if(!result) { throw 'Identifiant ou mot de passe incorrecte' };

            req.session.user = {
                id: user.id,
                pseudo: user.pseudo,
                first_name: user.first_name,
                last_name: user.last_name
            }
            res.redirect('/admin');
        } catch(error) {
            res.render('back/login', { error });
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
    },

    profilPage: async (req, res) => {
        const notSeen = await Message.findAll({
            where: {
                seen: false
            }
        });
        res.render('back/profil', { notSeen, user: req.session.user });
    }
};

module.exports = adminController;