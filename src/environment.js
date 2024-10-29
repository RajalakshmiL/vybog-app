import config from "./config";

const REACT_APP_ENV = process.env.REACT_APP_ENV || "demo";

const environmentConfig = config[REACT_APP_ENV];

export default environmentConfig;
