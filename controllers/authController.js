// const db = require('../database');
const pooldb = require('../pooldb');
const bcrypt = require('bcryptjs');

exports.getUserLogin = (req, res) => {
	pooldb.getConnection((err, conn) => {
		if (err) {
			console.log(err, '=====> error occured');
		} else {
			console.log(JSON.stringify(req.session),'=======> INSIDE USER LOGIN');

			let success_msg = req.session.success_msg;
			
			if (!success_msg) {
				req.session.success_msg = null;
				res.render('userViews/userLogin', {
					layout: 'layouts/mainLayout',
					title: 'User Login',
				});
				return;
			} else {
				req.session.success_msg = null;
				res.render('userViews/userLogin', {
					layout: 'layouts/mainLayout',
					title: 'User Login',
					success_msg
				});
				
				return;
			}
		}
	});
};

/////////////////////////////////////connection
// pooldb.getConnection((err1, conn) => {
// 	if (err1) {
// 		console.log(err1, '=====> error occured');
// 	} else {

// 	}
// });

exports.postUserLogin = async (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			try {
				
				console.log(req.body, "============< req body")

				const { userId, username, password } = req.body;

				console.log(username, '==========> POSTING USER LOGIN');

				let errors = [];

				if (!username || !password) {
					errors.push({
						msg: 'Please enter all fields',
					});
				}

				if (errors.length > 0) {
					res.render('userViews/userLogin', {
						layout: 'layouts/mainLayout',
						title: 'User Login',
						errors,
						username,
						password,
					});
				} else {


					let queryString = `SELECT * FROM happyhealth.usertbl WHERE username = '${username}'; `

					console.log( username, userId, '*****User login DB Query Started**********\n');

					conn.query(queryString, async function (err, result) {
						conn.release();
						console.log('********Sucessfully Quered user login*******');

						if (err) {
							console.log(err, '-----while login');
						}

						console.log(result, '---------user login result');


						let userResult = result;

						if (userResult.length > 0) {
							const validPassword = await bcrypt.compare(password, userResult[0]['password']);
							if (validPassword) {
								req.session.userName = userResult[0]['userName'];
								req.session.userId = userResult[0]['userId'];

								function getUnreadAnn()
								{
									return new Promise(function(resolve, reject) {
										query_str = `SELECT count(*) as annCount FROM happyhealth.announcementstbl where  userId like '%${req.session.userId}%' ;`
										conn.query(query_str, function (err, rows, fields) {
											// Call reject on error states,
											// call resolve with results
											if (err) {
												return reject(err);
											}
											resolve(rows);
										});
									});
								}
					
								getUnreadAnn().then(function(rows) {
									console.log(rows[0].annCount, "=====================> resolved data........")
									req.session.annCount = rows[0].annCount;
									req.session.isLoggedIn = true;

									res.redirect('home');
									// res.locals.annCount = req.session.annCount;
								}).catch((err) => setImmediate(() => { throw err; })); 
								// req.session.annCount = annCount[0].count
							} else {
								errors.push({
									msg: 'Enter correct username or password',
								});
								res.render('userViews/userLogin', {
									layout: 'layouts/mainLayout',
									title: 'User Login',
									errors,
									username,
									password,
								});
								return;
							}
						} else {
							errors.push({
								msg: 'Enter correct username or password',
							});
							res.render('userViews/userLogin', {
								layout: 'layouts/mainLayout',
								title: 'User Login',
								errors,
								username,
								password,
							});
							return;
						}

					});
				}
			} catch (err) {
				console.log(err, '------------User post login controller error.');
			}
		}
	});
};

exports.getAdminLogin = (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			res.render('adminViews/adminLogin', {
				layout: 'layouts/mainLayout',
				title: 'admin Login',
			});

			conn.release();
		}
	});
};

exports.postAdminLogin = async (req, res) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			try {
				const { username, password } = req.body;
				let errors = [];

				if (!username || !password) {
					errors.push({
						msg: 'Please enter all fields',
					});
				}

				if (errors.length > 0) {
					res.render('adminViews/adminLogin', {
						layout: 'layouts/mainLayout',
						title: 'admin Login',
						errors,
						username,
						password,
					});
				} else {
					const queryString = `SELECT * FROM happyhealth.usertbl WHERE userName = '${username}' and Admin = 'Yes'`;

					console.log('*****admin login conn.query started*******');

					conn.query(queryString, async function (err, result) {
						console.log('********Sucessfully Quered admin login*******');
						if (result.length > 0) {
							const validPassword = await bcrypt.compare(password, result[0]['password']);

							if (validPassword) {
								const userId = result[0]['userId'];
								req.session.userName = result[0]['userName'];
								req.session.userId = userId;
								req.session.isLoggedIn = true;
								req.session.isAdmin = true;
								res.redirect('adminHome');
								console.log('*****Admin Login successfully*****');
							} else {
								errors.push({
									msg: 'Enter correct username or password',
								});
								res.render('adminViews/adminLogin', {
									layout: 'layouts/mainLayout',
									title: 'admin Login',
									errors,
									username,
									password,
								});
							}
						} else {
							errors.push({
								msg: 'Enter correct username or password',
							});
							res.render('adminViews/adminLogin', {
								layout: 'layouts/mainLayout',
								title: 'admin Login',
								errors,
								username,
								password,
							});
						}

						conn.release();
					});
				}
			} catch (err) {
				console.log(err, '----------------Admin post login controller error.');
			}
		}
	});
};

exports.getLogout = (req, res, next) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('*********logout controller********');
			if (req.session.isAdmin) {
				req.session = null;
				res.redirect('/adminLogin');
				return;
			}
			req.session = null;
			res.redirect('/');
			conn.release();
			return;
		}
	});
};

exports.getError = (req, res, next) => {
	pooldb.getConnection((err1, conn) => {
		if (err1) {
			console.log(err1, '=====> error occured');
		} else {
			console.log('****************Error controller');
			console.log(req.path, '------path');
			let route = req.path;
			res.status(404).send({
				status: 404,
				Error: 'Page Not Found',
				Route: route,
			});
			res.end();

			conn.release();
		}
	});
};
