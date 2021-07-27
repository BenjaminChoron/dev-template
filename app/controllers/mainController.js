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
        try {
            const article = await Article.findByPk(req.params.id);
            res.render('front/article', { article });
        } catch(error) {
            console.log(error);
        }
    },

    getContactPage : (req, res) => {
        res.render('front/contact');
    },
};


module.exports = mainController;