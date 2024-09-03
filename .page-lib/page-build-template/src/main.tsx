import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MDXProvider } from "@mdx-js/react";
import Page from "./Page.mdx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MDXProvider>
      <Page />
    </MDXProvider>
  </StrictMode>
);
