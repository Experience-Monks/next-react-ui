const path = require('path');

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const optimizedImagesConfig = {
  inlineImageLimit: 1,
  imagesName: '[name]-[hash].[ext]',
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  optimizeImages: process.env.OPTIMIZE_IMAGES === 'true',
  optimizeImagesInDev: process.env.OPTIMIZE_IMAGES === 'true',
  mozjpeg: {
    quality: 85
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  webp: {
    preset: 'default',
    quality: 85
  },
  // if using sizes attr, optimization goes through `responsive-loader` using `sharp`
  responsive: {
    disable: process.env.OPTIMIZE_IMAGES !== 'true',
    adapter: require('responsive-loader/sharp'),
    quality: 85
  }
};

const nextJSConfig = {
  trailingSlash: true,
  compress: false, // NOTE: enable this when doing SSR
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
  devIndicators: {
    autoPrerender: false
  },
  images: {
    disableStaticImages: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  webpack: function (config, options) {
    if (options.dev) {
      config.module.rules.push({
        test: /\.(js|ts)x?$/,
        enforce: 'pre',
        include: path.resolve('./src'),
        loader: 'eslint-loader'
      });
    }

    return config;
  }
};

const nextPlugins = [[optimizedImages, optimizedImagesConfig]];
if (process.env.BUNDLE_ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true
  });
  nextPlugins.push(withBundleAnalyzer);
}

module.exports = withPlugins(nextPlugins, nextJSConfig);
