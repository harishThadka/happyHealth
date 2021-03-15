const express = require('express');
const router = express.Router();

const adminLoginController = require('../controllers/adminLoginController');
const userGroupController = require('../controllers/userGroupController');
const challengeManagement = require('../controllers/challengeManagement');



/**
 * Admin Home routes
 */
router.get('/adminHome', adminLoginController.getAdminHome);

/**
 * Admin challenge management routes
 */
 router.get('/challengeManagement', challengeManagement.getChallengeManagement);
 router.get('/addChallenge', challengeManagement.addChallenge);
 router.post('/addChallenge', challengeManagement.postChallenge);
 
 // router.get('/editChallenge/', challengeManagement.ed);
 router.get('/editChallenge/:cid', challengeManagement.editChallenge);
 router.post('/editChallenge/:cid', challengeManagement.updateChallenge)
 router.post('/deleteChallenge/:cid', challengeManagement.deleteChallenge)
 router.get('/getChallengeUsers/:challengeId', challengeManagement.getChallengeUsers);
 // router.get('/addUser', challengeManagement.addUser);
 
 
 /**
  * Admin user management routes
  */
 router.get('/userManagement', adminLoginController.getUserManagement);
 //router.get('/editUser/:userId', adminLoginController.editUser);
 router.post('/updateUser/:userId', adminLoginController.updateUser);
 router.get('/deleteUser/:userId', adminLoginController.deleteUser);
 router.get('/getAdminUserName/:userId', adminLoginController.getAdminUserName);
 router.get('/getUserTotalMetrics/:userId', adminLoginController.getUserTotalMetrics);
 // router.get('/CSVManagement', adminLoginController.getCSV);
 router.get('/editUserInfo/:userId', adminLoginController.getUserInfo);
 /**
  *  Admin user group management routes
  */
 router.get('/groupManagement', userGroupController.getGroup);
 router.get('/editGroup/:groupId', userGroupController.editGroup);
 router.post('/updateGroup/:groupId', userGroupController.updateGroup);
 router.get('/deleteGroup/:groupId', userGroupController.deleteGroup);
 router.get('/getGroupMembers/:groupId', userGroupController.getGroupMembers);
 router.post('/getGroupMembers/:groupId/addUserAdmin', userGroupController.addUserAdmin)
 router.post('/getGroupMembers/:groupId/removeUserAdmin/:userId', userGroupController.removeUserAdmin)
 router.get('/removeUser/:groupId/:userId', userGroupController.removeUserGroup);
 router.get('/addUser/:groupId/:username', userGroupController.addUserGroup);
 router.get('/addGroup', userGroupController.addGroup);
 
 
 
 /**
  * Admin user analytics routes
  */
 router.get('/adminAnalytics', adminLoginController.getAdminAnalytics);
 router.get('/adminAnalyticsOverAll', adminLoginController.getAdminAnalyticsOverAll);


 module.exports = router;