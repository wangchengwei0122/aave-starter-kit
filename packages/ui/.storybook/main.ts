import type { StorybookConfig } from "@storybook/react-vite";

import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    return {
      ...config,
      plugins: [...(config.plugins || []), tailwindcss()],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@workspace/ui": path.resolve(__dirname, "../src"),
        },
      },
    };
  },
};
export default config;
