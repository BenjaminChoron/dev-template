const { User, Message, Project, Article } = require('../models');

const projectController = {
    createProjectPage: async (req, res) => {
        const notSeen = await Message.findAll({
            where: {
                seen: false
            }
        });
        res.render('back/createProject', { notSeen });
    },

    createProjectAction: async (req, res) => {
        await Project.create({
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
            see_link: req.body.web,
            github_link: req.body.github,
        });
        res.redirect('/admin');
    },

    updateProjectPage: async (req, res) => {
        const notSeen = await Message.findAll({
            where: {
                seen: false
            }
        });
        const project = await Project.findByPk(req.params.id);
        res.render('back/updateProject', { notSeen, project });
    },

    updateProjectAction: async (req, res) => {
        await Project.update({
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
            see_link: req.body.web,
            github_link: req.body.github
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin');
    },

    deleteProject: async (req, res) => {
        await Project.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin');
    },
};

module.exports = projectController;