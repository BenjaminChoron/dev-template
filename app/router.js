const express = require('express');

const adminMiddleware = require('./middlewares/adminMiddleware');

// controllers
const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');
const contactController = require('./controllers/contactController');
const articleController = require('./controllers/articleController');
const projectController = require('./controllers/projectController');

const router = express.Router();

// routes principales 
router.get('/', mainController.getHomePage);
router.get('/projects', mainController.getProjectsPage);
router.get('/projects/generic/:id', mainController.getOneBasicProject);
router.get('/projects/tech/:id', mainController.getOneTechProject);
router.get('/blog', mainController.getBlogPage);
router.get('/blog/:id', mainController.getOneArticle);
router.get('/contact', mainController.getContactPage);
router.post('/contact', contactController.actionContactForm);
router.get('/legals', mainController.getLegalsPage);

// ADMIN
router.get('/signup', adminController.signupPage);
router.post('/signup', adminController.signupAction);
router.get('/login', adminController.loginPage);
router.post('/login', adminController.loginAction);

router.get('/admin', adminMiddleware, adminController.adminPage);

// MESSAGES
router.get('/admin/messages', adminMiddleware, contactController.seeAllMessages);
router.get('/admin/messages/:id', adminMiddleware, contactController.seeOneMessage);
router.get('/admin/messages/:id/seen', adminMiddleware, contactController.seenStatus);
router.get('/admin/messages/:id/notseen', adminMiddleware, contactController.notSeenStatus);
router.get('/admin/messages/:id/delete', adminMiddleware, contactController.deleteOneMessage);

// ARTICLES
router.get('/admin/articles/create', adminMiddleware, articleController.createArticlePage);
router.post('/admin/articles/create', adminMiddleware, articleController.createArticleAction);
router.get('/admin/articles/:id/update', adminMiddleware, articleController.updateArticlePage);
router.post('/admin/articles/:id/update', adminMiddleware, articleController.updateArticleAction);
router.get('/admin/articles/:id/delete', adminMiddleware, articleController.deleteArticle);

// PROJECTS
router.get('/admin/project/create', adminMiddleware, projectController.createProjectPage);
router.post('/admin/project/create', adminMiddleware, projectController.createProjectAction);
router.get('/admin/project/:id/update', adminMiddleware, projectController.updateProjectPage);
router.post('/admin/project/:id/update', adminMiddleware, projectController.updateProjectAction);
router.get('/admin/project/:id/delete', adminMiddleware, projectController.deleteProject);

module.exports = router;