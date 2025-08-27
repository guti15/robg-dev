const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img"); 

module.exports = function(eleventyConfig) {
  // Copy static files directly to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "doc": "doc" });
  eleventyConfig.addPassthroughCopy({ "img": "img" });
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // ADD IMAGE OPTIMIZATION HERE
eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes, className) {
  let metadata = await Image(src, {
    widths: [200, 400, 600], // Smaller sizes for your use case
    formats: ["webp", "jpeg"],
    outputDir: "./public/img/optimized/",
    urlPath: "/img/optimized/",
    sharpOptions: {
      quality: 80
    }
  });

  let imageAttributes = {
    alt,
    sizes: sizes || "200px", // Default to 200px instead of responsive
    loading: "lazy",
    decoding: "async",
    class: className || ""
  };

  // Don't include width/height attributes that override CSS
  delete imageAttributes.width;
  delete imageAttributes.height;

  return Image.generateHTML(metadata, imageAttributes);
});
  
  // Date formatting filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // Date formatting for sitemap
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Markdown configuration
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if(outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Base configuration
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};
