"use client";

import { Column, Flex, Heading, Media, SmartLink, Tag, Text } from '@once-ui-system/core';
import styles from './Posts.module.scss';
import { formatDate } from '@/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
    direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
    return (
        <SmartLink
            fillWidth
            unstyled
            style={{ borderRadius: 'var(--radius-l)' }}
            key={post.slug}
            href={`/blog/${post.slug}`}>
            <Flex
                position="relative"
                transition="micro-medium"
                direction={direction}
                radius="l"
                className={styles.hover}
                fillWidth>
                {post.metadata.image && thumbnail && (
                    <Media
                        priority
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 640px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius="l"
                        src={post.metadata.image}
                        alt={'Thumbnail of ' + post.metadata.title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Column
                    position="relative"
                    fillWidth gap="4"
                    padding="24"
                    vertical="center">
                    <Heading
                        as="h2"
                        variant="heading-strong-l"
                        wrap="balance">
                        {post.metadata.title}
                    </Heading>
                    
                    <Flex gap="8" vertical="center" wrap>
                        <Text
                            variant="label-default-s"
                            onBackground="neutral-weak">
                            {formatDate(post.metadata.publishedAt, false)}
                        </Text>
                        { post.metadata.tag && (
                            <>
                                <Text variant="label-default-s" onBackground="neutral-weak">•</Text>
                                <Tag
                                    label={post.metadata.tag}
                                    variant="neutral" 
                                    size="s"
                                />
                            </>
                        )}
                    </Flex>
                    
                    {post.metadata.summary && (
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak"
                            style={{ marginTop: '8px' }}>
                            {post.metadata.summary}
                        </Text>
                    )}
                </Column>
            </Flex>
        </SmartLink>
    );
}