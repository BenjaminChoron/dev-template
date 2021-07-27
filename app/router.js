const { Project, Article } = require('../models');

const mainController = {
    getHomePage : (req, res) => {
        res.render('home');
    },

    getProjectsPage : async (req, res) => {
        try {
            const projects = await Project.findAll();
            res.render('work', { projects });
        } catch(err) {
            console.log(err);
        }
    },

    getBlogPage : async (req, res) => {
        try {
            const articles = await Article.findAll();
            res.render('blog', { articles });
        } catch(err) {
            console.log(err);
        }
    },

    getContactPage : (req, res) => {
        res.render('contact');
    },
};

// on l'exporte pour le rendre accessible dans d'autres fichiers
module.exports = mainController;