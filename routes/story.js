// storyRoutes.js
const express = require("express");
const router = express.Router();
const storyController = require("../controllers/story");

// Create a new story
module.exports = function (io) {
    router.post('/stories', (req, res) => storyController.createStory(req, res, io));

  // Get all stories
  router.get("/stories", storyController.getAllStories);
  router.get("/stories/:id", storyController.getStoryById);
  router.put("/stories/:id", storyController.updateStory);

  // Add more routes for updating, deleting, or getting a single story as needed.

  return router;
};
