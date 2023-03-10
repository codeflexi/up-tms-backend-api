const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all review
// @route     GET /api/v1/reviews
// @route     GET /api/v1/bootcamps/:bootcampId/reviews
// @access    PUblic

exports.getReviews = asyncHandler(async (req, res, next) => {


    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});

// @desc      Get single review
// @route     GET /api/v1/review
// @access    Private

exports.getReview = asyncHandler(async (req, res, next) => {

    const reviews = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if(!reviews){
        return next(
            new ErrorResponse(`No review found with the id of ${req.params.id}`),
        );
    }
    res.status(200).json({
        succes:true,
        data:reviews
    });

});

