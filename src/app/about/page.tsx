import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import TechStacks from "@/components/about/TechStacks";
import { TypeWriter } from "@/components/TypeWriter";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: "Tech Stacks",
      display: true,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: "Publications and Scientific Papers",
      display: true,
      items: [],
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide={true}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              <TypeWriter 
                texts={["Data Science Enthusiast", "AI Engineer", "Machine Learning Engineer", "Backend Developer"]}
                speed={150}
                deleteSpeed={100}
                pauseTime={2000}
              />
            </Text>
            {social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                        <React.Fragment key={item.name}>
                            <Button
                                className="s-flex-hide"
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                weight="default"
                                variant="secondary"
                            />
                            <IconButton
                                className="s-flex-show"
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                            />
                        </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl" style={{ textAlign: 'justify' }}>
              {about.intro.description}
            </Column>
          )}

          {/* Tech Stacks Section */}
          <TechStacks />

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="between" vertical="end" marginBottom="12" gap="12">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="l">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: React.ReactNode, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                          style={{ textAlign: 'justify' }}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak" style={{ textAlign: 'justify' }}>
                      {skill.description}
                    </Text>
                    {skill.images && skill.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {/* Publications and Scientific Papers Section */}
          <>
            <Heading
              as="h2"
              id="publications"
              variant="display-strong-s"
              marginTop="xl"
              marginBottom="40"
            >
              Publications and Scientific Papers
            </Heading>
            <Column fillWidth gap="l" marginBottom="40">
              <Column fillWidth gap="4">
                <Text variant="heading-strong-l">
                  Leveraging Machine Learning and Deep Learning for Enhanced Parkinson&apos;s Disease Symptom Analysis
                </Text>
                <Text variant="body-default-s" onBackground="brand-weak">
                  Care XDX Center, Kyushu Institute of Technology
                </Text>
                <Flex gap="8" vertical="center">
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    (2025)
                  </Text>
                  <Button
                    href="https://www.jstage.jst.go.jp/article/ijabc/2025/2/2025_111/_article"
                    variant="secondary"
                    size="s"
                    label="publication link"
                    style={{ color: '#0066cc' }}
                  />
                </Flex>
              </Column>

              <Column fillWidth gap="4">
                <Text variant="heading-strong-l">
                  Temporal-aware Ensemble Learning Facial Behavior Analysis for Accurate Depression Assessment
                </Text>
                <Text variant="body-default-s" onBackground="brand-weak">
                  Care XDX Center, Kyushu Institute of Technology
                </Text>
                <Flex gap="8" vertical="center">
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    (2025)
                  </Text>
                  <Button
                    href="https://www.jstage.jst.go.jp/article/ijabc/2025/2/2025_110/_article"
                    variant="secondary"
                    size="s"
                    label="publication link"
                    style={{ color: '#0066cc' }}
                  />
                </Flex>
              </Column>

              <Column fillWidth gap="4">
                <Text variant="heading-strong-l">
                  Experimental Exploration of Neural Style Transfer: Hyperparameter Impact and VGG Feature Dynamics in Batik Motif Generation
                </Text>
                <Text variant="body-default-s" onBackground="brand-weak">
                  ALife Robotics Inc
                </Text>
                <Flex gap="8" vertical="center">
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    (2025)
                  </Text>
                  <Button
                    href="https://dro.deakin.edu.au/articles/conference_contribution/Experimental_Exploration_of_Neural_Style_Transfer_Hyperparameter_Impact_and_VGG_Feature_Dynamics_in_Batik_Motif_Generation/28586507/1"
                    variant="secondary"
                    size="s"
                    label="publication link"
                    style={{ color: '#0066cc' }}
                  />
                </Flex>
              </Column>

              <Column fillWidth gap="4">
                <Text variant="heading-strong-l">
                  Efficiency Analysis of K-Nearest Neighbor and Forward Chaining Methods for Prediction of Stunting in Toddlers
                </Text>
                <Text variant="body-default-s" onBackground="brand-weak">
                  E-Journal UNMUL
                </Text>
                <Flex gap="8" vertical="center">
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    (2023)
                  </Text>
                  <Button
                    href="https://e-journals.unmul.ac.id/index.php/JIM/article/view/10169"
                    variant="secondary"
                    size="s"
                    label="publication link"
                    style={{ color: '#0066cc' }}
                  />
                </Flex>
              </Column>
            </Column>
          </>
        </Column>
      </Flex>
    </Column>
  );
}