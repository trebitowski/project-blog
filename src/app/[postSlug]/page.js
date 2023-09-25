import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const article = await loadBlogPost(postSlug);
  const { title, abstract } = article.frontmatter;

  return {
    title,
    description: abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = params;
  const article = await loadBlogPost(postSlug);
  const { title, publishedOn } = article.frontmatter;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}

export default BlogPost;
