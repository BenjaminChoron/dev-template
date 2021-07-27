const { User, Message, Project, Article } = require('../models');

const projectController = {
    createProjectPage: async (req, res) => {
        try {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });
            res.render('back/createProject', { notSeen });
        } catch(error) {
            console.log(error);
        }
    },

    createProjectAction: async (req, res) => {
        try {
            await Project.create({
                title: req.body.title,
                image: req.body.image,
                basic_content: req.body.basic_content,
                tech_content: req.body.tech_content,
                see_link: req.body.web,
                github_link: req.body.github,
            });
            res.redirect('/admin');
        } catch(error) {
            console.log(error);
        }
    },

    updateProjectPage: async (req, res) => {
        try {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });
            const project = await Project.findByPk(req.params.id);
            res.render('back/updateProject', { notSeen, project });
        } catch(error) {
            console.log(error);
        }
    },

    updateProjectAction: async (req, res) => {
        try {
            await Project.update({
                title: req.body.title,
                image: req.body.image,
                basic_content: req.body.basic_content,
                tech_content: req.body.tech_content,
                see_link: req.body.web,
                github_link: req.body.github
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

    deleteProject: async (req, res) => {
        try {
            await Project.destroy({
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

module.exports = projectController;