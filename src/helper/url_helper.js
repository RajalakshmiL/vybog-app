import config from "./config";

const REACT_APP_ENV = process.env.REACT_APP_ENV || "demo";

const currentConfig = config[REACT_APP_ENV];
console.log("REACT_APP_ENV", REACT_APP_ENV);

// console.log("currentConfig", currentConfig);

export const RESUME_PARSER_BASE_URL =
  currentConfig.baseURLs.resumeParserBaseURL;
export const LOGIN_URL = currentConfig.loginUrl;
export const PARSED_RESUME_URL = currentConfig.parseResumeUrl;
export const PROCESS_UPLOAD_FILE = currentConfig.processUploadedFile;
export const WEB_SOCKET_URL = currentConfig.WebSocketUrl;
