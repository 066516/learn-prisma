// storyController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Create a new story

const createStory = async (req, res,io) => {
  try {
    const { userId, content } = req.body;
    const story = await prisma.story.create({
      data: {
        userId,
        content,
      },
    });
    io.emit("story_created", story);
    res.status(201).json(story);
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json({ error: "Could not create story" });
  }
};

// Get all stories
const getAllStories = async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            posts: true,
            profile: true,
            // Add any other user fields you want to include
          },
        },
      },
    });
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Could not fetch stories" });
  }
};
const getStoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const story = await prisma.story.findFirst({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,

            // Add any other user fields you want to include
          },
        },
      },
    });

    res.status(200).json(story);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Could not fetch stories" });
  }
};
const updateStory = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("Invalid user ID.");
  }
  try {
    const story = await prisma.story.update({
      where: {
        id: id,
      },
      data: {
        visible: req.body.visible,
        content: req.body.content,
      },
    });
    res.status(200).json({ message: "story update successfully ", story });
  } catch (error) {
    console.error("Error updating stories:", error);
    res.status(500).json({ error: "Could not update stories" });
  }
};

// Add more controller functions for updating, deleting, or getting a single story as needed.

module.exports = {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
};
