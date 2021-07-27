const express = require('express');

const adminMiddleware = require('./middlewares/adminMiddleware');

// controllers
const mainController = require('./controllers/mainController');
const adminController = require('./controllers/adminController');

const router = express.Router();

// routes principales 
router.get('/', mainController.getHomePage);
router.get('/projects', mainController.getProjectsPage);
router.get('/blog', mainController.getBlogPage);
router.get('/contact', mainController.getContactPage);

// ADMIN
router.get('/signup', adminController.signupPage);
router.post('/signup', adminController.signupAction);
router.get('/login', adminController.loginPage);
router.post('/login', adminController.loginAction);

router.get('/admin', adminMiddleware, adminController.adminPage);

module.exports = router;