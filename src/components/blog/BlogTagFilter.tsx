'use client';

import React from 'react';
import { Button, Flex, Text } from '@once-ui-system/core';

interface BlogTagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
}

export function BlogTagFilter({ tags, selectedTags, onTagChange }: BlogTagFilterProps) {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // Remove tag from selection
      onTagChange(selectedTags.filter(t => t !== tag));
    } else {
      // Add tag to selection
      onTagChange([...selectedTags, tag]);
    }
  };

  const clearAllFilters = () => {
    onTagChange([]);
  };

  return (
    <Flex direction="column" marginBottom="24">
      <Text variant="label-default-s" onBackground="neutral-weak" marginBottom="8">
        Filter by category:
      </Text>
      <Flex 
        direction="row" 
        wrap={true} 
        gap="8" 
        align="center"
      >
        <Button
          variant={selectedTags.length === 0 ? "primary" : "secondary"}
          size="s"
          onClick={clearAllFilters}
        >
          All Posts
        </Button>
        
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTags.includes(tag) ? "primary" : "secondary"}
            size="s"
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
