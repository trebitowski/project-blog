import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);
const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const article = await loadBlogPost(postSlug);
  const { title, abstract } = article.frontmatter;

  return {
    title,
    description: abstract,
  };
}

const components = {
  pre: (props) => <CodeSnippet {...props} />,
  DivisionGroupsDemo,
  CircularColorsDemo,
};

async function BlogPost({ params }) {
  const { postSlug } = params;
  const article = await loadBlogPost(postSlug);
  const { title, publishedOn } = article.frontmatter;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={article.content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
