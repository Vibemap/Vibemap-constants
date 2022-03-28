'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const xray = require('x-ray');

require('x-ray-phantom');

// TODO: Use x-ray with phantom
const x = new xray();
  //.driver(phantom())


// https://bluebottlecoffee.com
// https://www.exploratorium.edu
const defaults = {
  url: `https://www.exploratorium.edu`
};

const getPage = (url = defaults.url) => {
  x(url, 'title')(function (err, title) {
    console.log(title); // Google
  });

  x(url, 'body')(function (err, body) {
    //console.log(body) // Google
  });

  // Get all links and filter out socials, Shopify, Menu, etc.

  // - crowdriff.com
  // - doordash
  // - pintrest
  // - square
  // - tripadvisor

  x(url, ['a@href'])(function (err, links) {
    console.log(links); // Google
  });

  x(url, ['p'])(function (err, text) {
    //console.log(text) // Google
  });

  x(url, ['script@src'])(function (err, scripts) {
    //console.log(scripts) // Google
  });

  x(url, ['img'])((img) => {
    console.log(`img `, img);
  });
};

const getImages = async (url = defaults.url) => {

  x(url, 'img')((img) => {
    console.log(`img `, img);
  });

  /*
  const images = await x(url, 'img.logo@src')
  console.log(`Images `, images);
  */
};

exports.getImages = getImages;
exports.getPage = getPage;
