const { User, Message, Project, Article } = require('../models');
const validator = require('validator');


const contactController = {
    actionContactForm : async (request, response) => {
        try {
            const first_name = /[^A-Za-z -]/g.test(request.body.first_name);
            const last_name = /[^A-Za-z -]/g.test(request.body.last_name);
            const email = validator.isEmail(request.body.email);
            const phone = validator.isNumeric(request.body.phone);
            const message = validator.escape(request.body.message);

            if(first_name) {
                response.render('contact', { 
                    firstname_error: `Ce champ ne doit contenir que des lettres, espaces et -`,
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    email: request.body.email,
                    phone: request.body.phone,
                    message_area: request.body.message
                });
            } else {
                if(last_name) {
                    response.render('contact', { 
                        lastname_error: `Ce champ ne doit contenir que des lettres, espaces et -`,
                        first_name: request.body.first_name,
                        last_name: request.body.last_name,
                        email: request.body.email,
                        phone: request.body.phone,
                        message_area: request.body.message
                    });
                } else {
                    if(!email) {
                        response.render('contact', { 
                            email_error: `Ce n'est pas un email valide`,
                            first_name: request.body.first_name,
                            last_name: request.body.last_name,
                            email: request.body.email,
                            phone: request.body.phone,
                            message_area: request.body.message
                        });
                    } else {
                        if(!phone) {
                            response.render('contact', { 
                                phone_error: `Ce champ ne doit contenir que des chiffres`,
                                first_name: request.body.first_name,
                                last_name: request.body.last_name,
                                email: request.body.email,
                                phone: request.body.phone,
                                message_area: request.body.message
                            });
                        } else {
                            await Message.create({
                                from: request.body.email,
                                first_name: request.body.first_name,
                                last_name: request.body.last_name,
                                phone: request.body.phone,
                                content: message,
                                seen: 'false',
                            });
                            response.render('front/contact', { message: `Votre message a été envoyé !`, done: "envoyé" });
                        }
                    }
                }
            }
        } catch(error) {
            console.log(error);
        }
    },

    seeAllMessages: async (req, res) => {
        try {
            const messages = await Message.findAll();
            const notSeen = await Message.findAll({
                where: {
                    seen: false
                }
            });

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

            res.render('back/messages', { messages: sortResult, notSeen });
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
            res.redirect('/admin/messages');
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
            res.redirect('/admin/messages');
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
            res.redirect('/admin/messages');
        } catch(error) {
            console.log(error);
        }
    },
};

module.exports = contactController;