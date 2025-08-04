'use client';

import React, { useState } from 'react';
import { Grid } from '@once-ui-system/core';
import { BlogTagFilter } from './BlogTagFilter';
import Post from './Post';

// Define the post type to match the structure from getPosts
interface PostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  tag?: string;
}

interface PostData {
  slug: string;
  metadata: PostMetadata;
}

interface PostsWithFilterProps {
  posts: PostData[];
  showFilter?: boolean;
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  range?: [number] | [number, number];
}

export function PostsWithFilter({ 
  posts, 
  showFilter = true, 
  columns = "1", 
  thumbnail = false, 
  direction = "column",
  range
}: PostsWithFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags from posts
  const allTags = Array.from(
    new Set(
      posts
        .map(post => post.metadata.tag)
        .filter(Boolean) // Remove undefined/null tags
    )
  ) as string[];

  // Filter posts based on selected tags
  const filteredPosts = selectedTags.length === 0 
    ? posts 
    : posts.filter(post => 
        post.metadata.tag && selectedTags.includes(post.metadata.tag)
      );

  // Apply range if specified
  const displayedPosts = range && filteredPosts.length > 0
    ? filteredPosts.slice(
        range[0] - 1,
        range.length === 2 ? range[1] : filteredPosts.length 
    )
    : filteredPosts;

  const handleFilterChange = (newSelectedTags: string[]) => {
    setSelectedTags(newSelectedTags);
  };

  return (
    <>
      {showFilter && allTags.length > 0 && (
        <BlogTagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagChange={handleFilterChange}
        />
      )}
      
      <Grid
        columns={columns}
        fillWidth
        marginBottom="40"
        gap="12"
        marginTop={showFilter ? "l" : undefined}
      >
        {displayedPosts.map((post) => (
          <Post
            key={post.slug}
            post={post}
            thumbnail={thumbnail}
            direction={direction}
          />
        ))}
      </Grid>
    </>
  );
}
