const express = require('express');

const { getReviews ,getReview } = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');

// Use MergeParams
const router = express.Router({mergeParams:true});

router.route('/')
.get(advancedResults(Review,{
    path:'bootcamp',
    select: 'name description'
}),getReviews);

router.route('/:id')
.get(getReview);



module.exports = router;