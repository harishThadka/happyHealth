const db = require('../../database');


exports.getAdminAnnouncements = (req, res) => {
    console.log("***** Admin Announcements started ******")
    const messageId = req.session.messageId;
    console.log(messageId)

    const aaQuery = `Select messageId, title, message, userId from happyhealth.announcementsTbl;`;
    db.query(aaQuery, function (err, result) {
        if (err) {
            console.log(err, "*****error while getting admin announcments*****");
        } else {
            console.log(result, '****getAdminAnnouncements executed successfully****');

            res.render('adminViews/adminAnnouncements', {
                layout: 'layouts/adminLayout',
                title: 'Announcements',
                result
            });
        }
    });

};


exports.postAdminAnnouncements = (req, res) => {
    let messageId = req.session.messageId;
    const {
        title,
        message,
        userId
    } = req.body;
    console.log("-------post Admin Announcements controller");
    let errors = [];
    if (!title || !message) {
        errors.push('Please enter all fields!');
        console.log(errors, "****error while posting admin announcments****");
        res.render('adminViews/adminAnnouncements', {
            layout: 'layouts/adminLayout',
            title: 'Announcements'
        });
    }
    var aaQuery = `UPDATE happyhealth.announcementsTbl SET title = ${title}, message = ${message}, userId = ${userId} WHERE messageId = ${messageId};`;
    db.query(aaQuery, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('adminViews/adminAnnouncements');
        }
    });

};

// exports.getAdminAnnouncements = (req, res) => {
//     res.render('adminViews/adminAnnouncements', {
//         layout: 'layouts/adminLayout',
//         title: 'Admin Announcements'
//     });
//     console.log('****getAdminAnnouncements executed successfully****');
// };
