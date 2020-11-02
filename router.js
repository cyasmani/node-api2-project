const express = require('express')
const dataBase = require('./data/db')
const router = express.Router()

router.post("/api/posts", (req, res) => {
    // const info = {
    //     title: req.body.title,
    //     contents: req.body.contents,
    //     created_at: req.body.created_at,
    //     update_at: req.body.update_at
    // }
    dataBase.insert(req.body)
    .then(data => {
        if(data) {
            res.status(201).send("Created")
        } else {
            res.status(400).json({errorMessage: "Please provide title and contents for the post"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })

})

router.post('/api/posts/:id/comments', (req, res) => {
    //const post =  users.find(n => n.id === parseInt(req.params.id))
    dataBase.findCommentById(req.params.id)
    .then(data => {
        if(data) {
            res.status(201).json(data)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
        
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    })


})

router.get("/api/posts", (req,res) => {
    dataBase.find(req.body)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})


router.get("/api/posts/:id", (req, res) => {
    dataBase.findById(req.params.id)
    .then(data => {
        if(data) {
            res.status(data)
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The post information could not be retrieved."})
    })

})

router.get("/api/posts/:id/comments", (req,res) => {
    dataBase.findPostComments(req.params.id)
    .then(data => {
        if(data) {
            res.status(data)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})

router.delete('/api/posts/:id', (req,res) => {
    dataBase.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({message: "The post with the specified ID has been deleted."})
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The post could not be removed"})
    })
})

router.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    dataBase.update(req.params.id, changes)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else if(!req.body.title || !req.body.contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})  
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The post information could not be modified."})
    })
})

module.exports = router;