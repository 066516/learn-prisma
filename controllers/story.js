// storyController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Create a new story

const createStory = async (req, res, io) => {
  const { userId, content } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newStory = await tx.story.create({
        data: {
          content: content,
          userId: userId,
        },
      });

      const userUpdate = await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          lastPostDate: new Date(),
        },
      });

      return { newStory, userUpdate }; // Return both newStory and userUpdate
    });

    // Emit the new story after the transaction has successfully committed
    io.emit("story_created", result.newStory);

    // Send a response with the new story and user update info
    res.status(201).json(result);
  } catch (error) {
    console.error("Transaction failed:", error);
    
    // Send a more specific error response based on the actual error
    res.status(500).json({ message: "An error occurred while creating the story", error: error.message });
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
