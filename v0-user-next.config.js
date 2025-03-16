/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // The following lines are important for GitHub Pages
  // The basePath should match your repository name
  basePath: process.env.NODE_ENV === "production" ? "/fitness_app" : "",

  // This ensures assets are referenced correctly
  assetPrefix: process.env.NODE_ENV === "production" ? "/fitness_app/" : "",

  // Required for static image optimization to be disabled
  images: {
    unoptimized: true,
  },

  // Adds trailing slashes to all routes
  trailingSlash: true,
}

module.exports = nextConfig

