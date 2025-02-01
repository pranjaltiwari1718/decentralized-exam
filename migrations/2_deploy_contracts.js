const ExamDistribution = artifacts.require("ExamDistribution");

module.exports = function (deployer) {
  deployer.deploy(ExamDistribution).catch(error => {
    console.error("Deployment failed:", error);
  });
};
