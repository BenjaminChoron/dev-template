const { User, Message, Project, Article } = require('../models');

const articleController = {
    createArticlePage: async (req, res) => {
        try {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });
            res.render('back/createArticle', { notSeen });
        } catch(error) {
            console.log(error);
        }
    },

    createArticleAction: async (req, res) => {
        try {
            await Article.create({
                title: req.body.title,
                subtitle: req.body.subtitle,
                image: req.body.image,
                content: req.body.content
            });
            res.redirect('/admin');
        } catch(error) {
            console.log(error);
        }
    },

    updateArticlePage: async (req, res) => {
        try {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });
            const article = await Article.findByPk(req.params.id);
            res.render('back/updateArticle', { notSeen, article });
        } catch(error) {
            console.log(error);
        }
    },

    updateArticleAction: async (req, res) => {
        try {
            await Article.update({
                title: req.body.title,
                subtitle: req.body.subtitle,
                image: req.body.image,
                content: req.body.content
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/admin');
        } catch(error) {
            console.log(error);
        }
    },

    deleteArticle: async (req, res) => {
        try {
            await Article.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/admin');
        } catch(error) {
            console.log(error);
        }
    },
};

module.exports = articleController;