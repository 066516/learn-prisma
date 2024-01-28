const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Define a cron job that runs daily at a specific time (adjust the time as needed)
cron.schedule("*/2 * * * *", async () => {
  try {
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getMinutes() - 1);

    // Find and update stories where the created timestamp is older than 24 hours
    const updatedStories = await prisma.story.updateMany({
      where: {
        createdAt: {
          lt: twentyFourHoursAgo,
        },
        visible: true, // You may want to only update visible stories
      },
      data: {
        visible: false,
      },
    });

    if (updatedStories.count > 0) {
      console.log(`Updated ${updatedStories.count} stories.`);
    }
  } catch (error) {
    console.error("Error updating stories:", error);
  }
});
