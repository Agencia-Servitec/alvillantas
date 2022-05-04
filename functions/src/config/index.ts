import config from "./config.json";

const projectId = process.env.GCLOUD_PROJECT;

const currentEnvironment =
  projectId === "alvillantas-xxxxxx" ? "production" : "development";

const isProduction = currentEnvironment === "production";

const environmentConfig = { ...config[currentEnvironment], ...config.common };

export { currentEnvironment, isProduction, environmentConfig, config };
