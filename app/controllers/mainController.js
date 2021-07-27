const { Project, Article } = require('../models');

const mainController = {
    getHomePage : (req, res) => {
        res.render('front/home');
    },

    getProjectsPage : async (req, res) => {
        try {
            const projects = await Project.findAll();
            res.render('front/projects', { projects });
        } catch(err) {
            console.log(err);
        }
    },

    getBlogPage : async (req, res) => {
        try {
            const articles = await Article.findAll();
            res.render('front/blog', { articles });
        } catch(err) {
            console.log(err);
        }
    },

    getOneArticle: async (req, res) => {
        const article = await Article.findByPk(req.params.id);
        res.render('front/article', { article });
    },

    getContactPage : (req, res) => {
        res.render('front/contact');
    },
};

// on l'exporte pour le rendre accessible dans d'autres fichiers
module.exports = mainController;