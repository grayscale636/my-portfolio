import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { PostsWithFilter } from "@/components/blog/PostsWithFilter";
import { getPosts } from "@/utils/utils";
import { baseURL, blog, person, newsletter } from "@/resources";
import PageGuard from "@/components/PageGuard";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  // Get posts on server-side
  const allPosts = getPosts(['src', 'app', 'blog', 'posts']);
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return (
    <PageGuard pageName="blog">
      <Column maxWidth="s">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      
      {/* Pass posts data to client component */}
      <PostsWithFilter posts={sortedPosts} showFilter={true} columns="1" thumbnail direction="column"/>
      
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
    </PageGuard>
  );
}
