const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//          Likes DisLikes
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})


router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


router.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    //Like collection에다가 클릭정보 넣기

    const like = new Like(variable)
    
    like.save((err, likeResult) => {

        if (err) return res.json({ success: false, err });

        //만약에 Dislike 이미 클릭이 되었다면, dislike 1을 줄여준다.

        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})




router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})


router.post("/unDisLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})
