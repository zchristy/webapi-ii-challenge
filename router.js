const express = require('express');

const db = require('./data/db.js')

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  db.find()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  db.findById(id)
  .then(post => {
    if(post.length > 0) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })
})

router.get('/:id/comments', (req, res) => {
  const { id } = req.params

  db.findById(id)
  .then(post => {
    if(post.length > 0) {
      db.findPostComments(id)
        .then(comments => {
          res.status(200).json(comments)
        })
        .catch(err => {
          res.status(500).json({ error: "The comments information could not be retrieved." })
        })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  })
})

router.post('/', (req, res) => {
  const { title, contents } = req.body;

  const post = req.body;

  if(title && contents) {
    db.insert(posts)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
      })
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
})

router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const newComment = {
    text: text,
    post_id: id
  }

  if(text) {
    db.findById(id)
    .then(post => {
      if(post.length > 0) {
        db.insertComment(newComment)
          .then(comment => {
            res.status(201).json(comment)
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database"})
          })
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while looking for post with specified id" })
    })
  } else {
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
  }

})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body

  const newPost = {
    title: title,
    contents: contents
  }
  console.log(newPost)
  if(title && contents) {
    db.findById(id)
    .then(post => {
      if(post.length > 0) {
        db.update(id, newPost)
          .then(id => {
            res.status(201).json(post)
          })
          .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
          })
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while looking for post with specified id" })
    })
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }

})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.findById(id)
  .then(post => {
    if(post.length > 0){
      db.remove(id)
      .then(post => {
        res.status(200).json({message: "Post deletion successful"})
      })
      .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
      })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "There was an error while looking for post with specified id" })
  })
})

module.exports = router;
