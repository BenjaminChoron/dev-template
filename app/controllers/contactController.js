const { User, Message, Project, Article } = require('../models');
const validator = require('validator');
const paginate = require('express-paginate');


const contactController = {
    actionContactForm : async (request, response) => {
        try {
            const first_name = /[^A-Za-z -]/g.test(request.body.first_name);
            const last_name = /[^A-Za-z -]/g.test(request.body.last_name);
            const email = validator.isEmail(request.body.email);
            const phone = validator.isNumeric(request.body.phone);
            const message = validator.escape(request.body.message);

            const errors = {};

            if(first_name) { errors.first_name = `Ce champ ne doit contenir que des lettres, espaces et -` }
            if(last_name) { errors.last_name = `Ce champ ne doit contenir que des lettres, espaces et -` }
            if(!email) { errors.email = `Ce n'est pas un email valide` }
            if(!phone) { errors.phone = `Ce champ ne doit contenir que des chiffres` }

            if(Object.keys(errors).length === 0) {
                await Message.create({
                    from: request.body.email,
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    phone: request.body.phone,
                    content: message,
                    seen: 'false',
                });
                response.render('front/contact', { message: `Votre message a été envoyé !`, done: "envoyé" });
            } else {
                let body = {
                    email: request.body.email,
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    phone: request.body.phone,
                    message: request.body.message
                }
                response.render('front/contact', { errors, body });
            }
        } catch(error) {
            console.log(error);
        }
    },

    seeAllMessages: async (req, res) => {
        try {
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });

            const messages = await Message.findAll();

            // TRIER LES MESSAGES PAR ID
            // function pour comparer les valeurs
            const sortByMapped = (map,compareFn) => (a,b) => compareFn(map(a), map(b));
            // base de la comparaison
            const byValue = (a,b) => a - b;
            // ce qu'on compare
            const toId = e => e.id;
            // on lance la comparaison
            const byId = sortByMapped(toId,byValue);
            // on sort le resultat
            const sortResult = [...messages].sort(byId);

            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {};

            if(endIndex < messages.length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if(startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            
            results.results = sortResult.slice(startIndex, endIndex);

            numberOfPages = Math.ceil(messages.length / limit);

            res.render('back/messages', {
                currentPage: page,
                numberOfPages, 
                next: results.next,
                previous: results.previous,
                messages: results.results,
                allMessages: messages,
                notSeen
            });
        } catch(error) {
            console.log(error);
        }
    },

    seeOneMessage: async (req, res) => {
        try {
            const message = await Message.findByPk(req.params.id);
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });
            res.render('back/message', { message, notSeen });
        } catch(error) {
            console.log(error);
        }
    },

    deleteOneMessage: async (req, res) => {
        try {
            await Message.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin/messages?page=1&limit=10`);
        } catch(error) {
            console.log(error);
        }
    },

    seenStatus: async (req, res) => {
        try {
            await Message.update({ seen: 'true' }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/admin/messages?page=1&limit=10');
        } catch(error) {
            console.log(error);
        }
    },

    notSeenStatus: async (req, res) => {
        try {
            await Message.update({ seen: 'false' }, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/admin/messages?page=1&limit=10');
        } catch(error) {
            console.log(error);
        }
    },
};

module.exports = contactController;