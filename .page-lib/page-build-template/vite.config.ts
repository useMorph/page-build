import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), { enforce: "pre", ...mdx(mdxOptions) }, viteSingleFile()],
});
