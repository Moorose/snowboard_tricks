// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
<<<<<<< HEAD
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
=======
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
>>>>>>> master
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage/snowboard-tricks"),
      reports: ["html", "lcovonly", "text-summary"],
<<<<<<< HEAD
      fixWebpackSourcePaths: true
=======
      fixWebpackSourcePaths: true,
>>>>>>> master
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "HeadlessChrome"],
    customLaunchers: {
      HeadlessChrome: {
<<<<<<< HEAD
      base: "ChromeHeadless",
      flags: ["--no-sandbox"]
      }
  },
    singleRun: false,
    restartOnFileChange: true
=======
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
>>>>>>> master
  });
};
