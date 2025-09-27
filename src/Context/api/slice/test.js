
// @no. 17
// @crud u8
// @desc flame answer/unanswer blog
// @method PATCH
// @route /:id/flameAnswer"
// @access private
const flameAnswer = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog.flameAnswers.includes(req.body.userId)) {
        await blog.updateOne({$push: {flameAnswers: req.body.userId}});
        res.status(200).json("This blog has been answered.");
    } else {
        await blog.updateOne({$pull: {flameAnswers: req.body.userId}});
        res.status(200).json("This blog is no longer answered.");
    }
});

// @no. 18
// @crud u9
// @desc Union answer/unanswer blog
// @method PATCH
// @route /:id/unionAnswer"
// @access private
const unionAnswer = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog.unionAnswers.includes(req.body.unionId)) {
        await blog.updateOne({$push: {unionAnswers: req.body.unionId}});
        res.status(200).json("This blog has been answered.");
    } else {
        await blog.updateOne({$pull: {unionAnswers: req.body.unionId}});
        res.status(200).json("This blog is no longer answered.");
    }
});