let DirtTexture: any;
let WaterTexture: any;
let GrassTexture: any;
let Steve: any;

if (process?.env?.NODE_ENV === "test") {
  // This is necessary because in AVA tests it can't require imgs, so we mock them
  DirtTexture = "dirt";
  WaterTexture = "water";
  GrassTexture = "grass";
  Steve = "steve";
} else {
  DirtTexture = require("./dirt_texture.jpeg");
  WaterTexture = require("./water_texture.png");
  GrassTexture = require("./grass_texture.jpg");
  Steve = require("./steve.png");
}

const Images = { DirtTexture, WaterTexture, GrassTexture, Steve };
export default Images;
