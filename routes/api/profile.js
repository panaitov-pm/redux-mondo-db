const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

router.get('/test', (req, res) => {
	res.json({msg: 'Profile works'});
});


router.get('/', passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const errors = {}
		Profile.findOne({user: req.user.id})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'profile not found'
				return res.status(404).json(errors)

			}
			res.json(profile);
		})
		.catch(error => res.status(404).json(error))
	}
);

// Create profile
router.post('/', passport.authenticate('jwt', {session: false}),
	(req, res) => {

		const {errors, isValid} = validateProfileInput(req.body)
		if (!isValid) {
			return res.status(400)
			.json(errors)
		}


		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
		// skils is array
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		profileFields.social = {}

		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({user: req.user.id})
		.then(profile => {
			if (profile) {
				// Update
				Profile.findOneAndUpdate(
					{user: req.user.id},
					{$set: profileFields},
					{new: true}
				).then(profile => res.json(profile))
			} else {
				// create

				Profile.findOne({profile: profileFields.handle})
				.then(profile => {
					// check if exists
					if (profile) {
						errors.handle = 'That handle already exists';
						res.status(400).json(errors)
					}
					// create
					new Profile(profileFields)
					.save()
					.then(profile => res.json(profile));
				})
			}
		});
	});


/// http://localhost:5000/api/profile/handle/:handle
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({handle: req.params.handle})
	.populate('user', ['name', 'avatar'])
	.then(profile => {
		if (!profile) {
			errors.profile = 'No found that profile';
			return res.status(404).json(errors);
		}
		res.json(profile);
	})
	.catch(error => res.status(404).json({profile: 'there is no profile for this user'}))
});


/// http://localhost:5000/api/profile/user/:user_id
router.get('/user/:userid', (req, res) => {
	const errors = {};
	Profile.findOne({user: req.params.userid})
	.populate('user', ['name', 'avatar'])
	.then(profile => {
		if (!profile) {
			errors.profile = 'No found that profile';
			return res.status(404).json(errors);
		}
		res.json(profile);
	})
	.catch(error => res.status(404).json({profile: 'there is no profile for this user'}))
});

/// http://localhost:5000/api/profile/all
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
	.populate('user', ['name', 'avatar'])
	.then(profiles => {
		if (!profiles) {
			errors.profile = 'No found any profiles';
			return res.status(404).json(errors);
		}
		res.json(profiles);
	})
	.catch(error => res.status(404).json({profile: 'there are no any profiles'}))
});


// Create experience
router.post('/experience', passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const {errors, isValid} = validateExperienceInput(req.body);
		if (!isValid) {
			return res.status(400)
			.json(errors)
		}

		Profile.findOne({user: req.user.id})
		.then(profile => {
			const newExp = {
				title      : req.body.title,
				company    : req.body.company,
				location   : req.body.location,
				from       : req.body.from,
				to         : req.body.to,
				current    : req.body.current,
				description: req.body.description
			};

			profile.experience.unshift(newExp);
			profile.save()
			.then(profile => res.json(profile))

		})

	});


// Create education
router.post('/education', passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const {errors, isValid} = validateEducationInput(req.body);
		if (!isValid) {
			return res.status(400)
			.json(errors)
		}

		Profile.findOne({user: req.user.id})
		.then(profile => {
			const newEdu = {
				school      : req.body.school,
				degree      : req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from        : req.body.from,
				to          : req.body.to,
				current     : req.body.current,
				description : req.body.description
			};

			profile.education.unshift(newEdu);
			profile.save()
			.then(profile => res.json(profile))

		})

	});


/// delete experience
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Profile.findOne({user: req.user.id})
		.then(profile => {
			const removeIndex = profile.experience.map(p => p.id)
			.indexOf(req.params.exp_id);

			profile.experience.splice(removeIndex, 1);
			profile.save()
			.then(profile => res.json(profile))
			.catch(error => res.status(404).json(err))
		})
	});

/// delete education
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Profile.findOne({user: req.user.id})
		.then(profile => {
			const removeIndex = profile.education.map(p => p.id)
			.indexOf(req.params.edu_id);

			profile.education.splice(removeIndex, 1);
			profile.save()
			.then(profile => res.json(profile))
			.catch(error => res.status(404).json(err))
		})
	});

// http://localhost:5000/api/profile
router.delete('/', passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Profile.findOneAndRemove({user: req.user.id})
		.then(() => {
			User.findOneAndRemove({_id: req.user.id})
			.then(() => res.json({success: true}))
		})
	});


module.exports = router;