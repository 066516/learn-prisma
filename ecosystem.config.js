module.exports = {
  apps: [
    {
      name: "learn-prisma",
      script: "nodemonWrapper.js",
      // No need for 'args' since the target script is specified in the wrapper
      watch: true,
      ignore_watch: ["node_modules", ".git"],
      // Additional configurations...
    },
  ],
};
