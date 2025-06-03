const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Copy static files directly to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "doc": "doc" });
  eleventyConfig.addPassthroughCopy({ "img": "img" });
  eleventyConfig.addPassthroughCopy("src/CNAME");
  
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
