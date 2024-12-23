const cron = require("node-cron");
const { updateExpiredJobs } = require("../services/Tintd.service");

const setupExpirationCronJob = () => {
  cron.schedule("1 0 * * *", async () => {
    console.log("Running job expiration check...");
    const result = await updateExpiredJobs();
    console.log("Job expiration check result:", result);
  });
};
module.exports = setupExpirationCronJob;
