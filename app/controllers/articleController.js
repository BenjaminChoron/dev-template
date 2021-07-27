const { User, Message, Project, Article } = require('../models');

const articleController = {
    createArticlePage: async (req, res) => {
        const notSeen = await Message.findAll({
            where: {
                seen: false
            }
        });
        res.render('back/createArticle', { notSeen });
    },

    createArticleAction: async (req, res) => {
        await Article.create({
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: req.body.image,
            content: req.body.content
        });
        res.redirect('/admin');
    },

    updateArticlePage: async (req, res) => {
        const notSeen = await Message.findAll({
            where: {
                seen: false
            }
        });
        const article = await Article.findByPk(req.params.id);
        res.render('back/updateArticle', { notSeen, article });
    },

    updateArticleAction: async (req, res) => {
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
    },

    deleteArticle: async (req, res) => {
        await Article.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin');
    },
};

module.exports = articleController;