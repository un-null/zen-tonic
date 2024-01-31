module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em", // 576px
        "mantine-breakpoint-sm": "48em", // 768px
        "mantine-breakpoint-md": "64em", // 1024px
        "mantine-breakpoint-lg": "75em", // 1200px
        "mantine-breakpoint-xl": "88em", // 1408px
      },
    },
  },
};
