import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MDXProvider } from "@mdx-js/react";
import { PageProvider } from "@use-morph/page";
import Page from "./Page.mdx";
import "./index.css";
import "@use-morph/page/css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PageProvider
      isPreview={import.meta.env.VITE_IS_PREVIEW === "true" ? true : false}
    >
      <MDXProvider>
        <Page />
      </MDXProvider>
    </PageProvider>
  </StrictMode>
);
