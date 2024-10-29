const config = {
  development: {
    baseURLs: {
      resumeParserBaseURL: "https://api-stage.vylabs.ai",
    },
    loginUrl: "/users/signin/",
    parseResumeUrl: "/files/get-upload-urls/",
    processUploadedFile: "/resumes/process-uploaded-file/",
    WebSocketUrl: "/api-stage.vylabs.ai",
  },
  demo: {
    baseURLs: {
      resumeParserBaseURL: "https://api-stage.vylabs.ai",
    },
    loginUrl: "/users/signin/",
    parseResumeUrl: "/files/get-upload-urls/",
    processUploadedFile: "/resumes/process-uploaded-file/",
    WebSocketUrl: "/api-stage.vylabs.ai",
  },
  production: {
    baseURLs: {
      resumeParserBaseURL: "https://api-stage.vylabs.ai",
    },
    loginUrl: "/users/signin/",
    parseResumeUrl: "/files/get-upload-urls/",
    processUploadedFile: "/resumes/process-uploaded-file/",
    WebSocketUrl: "/api-stage.vylabs.ai",
  },
};

export default config;
