"use strict";

console.log("Content Start");

const video = document.getElementsByClassName("video-stream")[0];

function modelLoaded() {
  console.log("Model Loaded!", featureExtractor);
}
function videoReady() {
  console.log("The video is ready!", classifier);
}
function modelReady() {
  console.log("The MODEL is ready!", customModel);
}
const featureExtractor = ml5.featureExtractor("MobileNet", modelLoaded);
const classifier = featureExtractor.classification(video, videoReady);
const customModel = featureExtractor.load("file:///C:/Users/danie/Desktop/electron/skipper/model/model.json", modelReady);

let play = false;

const FPS = 1;
const mainLoop = () => {
  classifier.classify(video, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result); // Should output 'dog'
    }
  });

  if (play) {
    setTimeout(() => {
      mainLoop();
    }, 1000 / FPS);
  }
};

const start = () => {
  play = true;
  mainLoop();
  console.log("Starting", classifier);
};

const end = () => {
  play = false;
  console.log("Stopping");
};

browser.runtime.onMessage.addListener((request) => {
  if (request.action == "start") {
    start();
  }
  if (request.action == "end") {
    end();
  }
  return Promise.resolve({ response: "Hi from content script" });
});

console.log("Content End");
