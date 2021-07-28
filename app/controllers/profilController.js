const { User, Message, Project, Article } = require('../models');
const { compare, hashSync } = require("bcrypt");

const profilController = {
    profilPage: async (req, res) => {
        const notSeen = await Message.findAll({
            where: {
                seen: false
            }
        });
        res.render('back/profil', { notSeen, user: req.session.user });
    },

    profilInfosUpdate: async (req, res) => {
        try {
            await User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }, {
                where: {
                    id: req.params.id
                }
            });

            req.session.user.first_name = req.body.first_name;
            req.session.user.last_name = req.body.last_name;

            res.redirect('/admin/profil');
        } catch(error) {
            console.log(error);
        }
    },

    profilPseudoUpdate: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    pseudo: req.body.pseudo
                }
            });
            
            if(user) { throw 'Ce pseudo existe déjà' };

            await User.update({
                pseudo: req.body.pseudo
            }, {
                where: {
                    id: req.params.id
                }
            });

            req.session.user.pseudo = req.body.pseudo;

            res.redirect('/admin/profil');
        } catch(error) {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });

            res.render('back/profil', { notSeen, pseudoError: error, pseudo: req.body.pseudo })
        }
    },

    profilPasswordUpdate: async (req, res) => {
        try {
            if(!req.body.password || req.body.password !== req.body.passwordConfirm) { throw 'Les deux mots de passe ne sont pas identiques' };

            await User.update({
                password: hashSync(req.body.password, 10)
            }, {
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/admin/profil');
        } catch(error) {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });

            res.render('back/profil', { notSeen, passwordError: error });
        }
    },

    profilDelete: async (req, res) => {
        try {
            if(!req.body.password) { throw 'Vous devez renseigner un mot de passe' };

            const user = await User.findByPk(req.params.id);

            const result = await compare(req.body.password, user.password);

            if(!result) { throw 'Mot de passe incorrecte' };

            await User.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/signup');
        } catch(error) {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });

            res.render('back/profil', { notSeen, deleteError: error });
        }
    },
};

module.exports = profilController;