let DirtTexture: any;
let WaterTexture: any;
let GrassTexture: any;

if (process?.env?.NODE_ENV === "test") {
  // This is necessary because in AVA tests it can't require imgs, so we mock them
  DirtTexture = "dirt";
  WaterTexture = "water";
  GrassTexture = "grass";
} else {
  DirtTexture = require("./dirt_texture.jpeg");
  WaterTexture = require("./water_texture.png");
  GrassTexture = require("./grass_texture.jpg");
}

const Images = { DirtTexture, WaterTexture, GrassTexture };
export default Images;
