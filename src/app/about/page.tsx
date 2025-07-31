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
import { TypeWriter } from "@/components";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { 
  SiGithub, 
  SiDocker, 
  SiPython, 
  SiJavascript, 
  SiTensorflow, 
  SiPytorch, 
  SiScikitlearn, 
  SiFastapi, 
  SiFlask, 
  SiOpencv,
  SiLinux,
  SiPostgresql,
  SiR,
  SiPandas,
  SiNumpy,
  SiPlotly,
  SiTableau,
  SiPostman
} from "react-icons/si";
import { BiLogoMicrosoft } from "react-icons/bi";

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
          style={{ 
            top: "50%", 
            transform: "translateY(-50%)",
            display: "none" // Hide on small screens
          }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          className="hidden-on-mobile"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth direction="column" horizontal="center">
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
                texts={[
                  person.role, 
                  "AI Engineer",  
                  "Backend Developer",
                  "Data Scientist",
                  "Machine Learning Engineer",
                ]} 
                speed={100} 
                deleteSpeed={60} 
                pauseTime={2500} 
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
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {/* Skills Section */}
          <Column fillWidth marginBottom="xl">
            <Heading as="h2" variant="display-strong-s" marginBottom="l">
              Stacks
            </Heading>
            <Flex fillWidth gap="12" wrap horizontal="center">
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiGithub size={24} color="#181717" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiDocker size={24} color="#2496ED" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiPython size={24} color="#3776AB" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiPostgresql size={24} color="#336791" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiR size={24} color="#276DC3" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiJavascript size={24} color="#F7DF1E" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiTensorflow size={24} color="#FF6F00" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiPytorch size={24} color="#EE4C2C" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiScikitlearn size={24} color="#F7931E" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiFastapi size={24} color="#009688" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiFlask size={24} color="#000000" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiOpencv size={24} color="#5C3EE8" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiLinux size={24} color="#FCC624" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiPandas size={24} color="#150458" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiNumpy size={24} color="#013243" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiPlotly size={24} color="#3F4F75" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiTableau size={24} color="#E97627" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <BiLogoMicrosoft size={24} color="#F25022" />
              </Flex>
              <Flex
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="m"
                padding="12"
                vertical="center"
                horizontal="center"
                minWidth="48"
                minHeight="48"
              >
                <SiPostman size={24} color="#FF6C37" />
              </Flex>
            </Flex>
          </Column>

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: React.ReactNode, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
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
                    <Text variant="body-default-m" onBackground="neutral-weak">
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
        </Column>
      </Flex>
    </Column>
  );
}