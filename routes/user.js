const express = require('express');
const router = express.Router();



const userHomeController = require('../controllers/user/userHomeController')
const userProfileController = require('../controllers/user/userProfileController')
const userChallengeController = require('../controllers/user/userChallengeController')
const userNotificationController = require('../controllers/user/userNotificationController')


/**
 * User home routes
 */
router.get('/home', userHomeController.getUserHome);


router.get('/userStep', userHomeController.getUserStep);
router.post('/userStep', userHomeController.postUserStep);

router.get('/userSleep', userHomeController.getUserSleep);
router.post('/userSleep', userHomeController.postUserSleep);

router.get('/userTrack', userHomeController.getUserTrack);
router.post('/userTrack', userHomeController.postUserTrack);

router.get('/userHydration', userHomeController.getUserHydration);
router.post('/userHydration', userHomeController.postUserHydration);

router.get('/userFruits', userHomeController.getUserFruits);
router.post('/userFruits', userHomeController.postUserFruits);

router.get('/userVegetables', userHomeController.getUserVegetables);
router.post('/userVegetables', userHomeController.postUserVegetables);


/**
 * User Profile routes
 */
 router.get('/userInfo',userProfileController.getUserInfo);
 router.get('/userProfile', userProfileController.getUserProfile);
 router.post('/userProfile', userProfileController.postUserProfile);

/**
 * User Challenges
 */

 router.get('/userChallenges', userChallengeController.getUserChallenges);
 router.get('/userMoreChallenges', userChallengeController.getUserMoreChallenges);
 router.get('/activeChallenges', userChallengeController.getActiveChallenges);
 router.get('/availableChallenges', userChallengeController.getAvailableChallenges);
 router.get('/completedChallenges', userChallengeController.getCompletedChallenges);
 router.post('/challengeAccepted/:challengeId', userChallengeController.setChallengesAccept);
 router.get('/personalGoals', userChallengeController.getPersonalGoals);


 /**
  * User Notification Controller
  */
 
router.get('/notifications', userNotificationController.getNotifications);




module.exports = router;