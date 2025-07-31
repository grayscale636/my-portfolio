"use client";

import React from "react";
import { Column, Flex, Heading, Text } from "@once-ui-system/core";
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

export default function TechStacks() {
  const stacks = [
    { name: "Python", icon: SiPython, color: "#3776ab" },
    { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00" },
    { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#f7931e" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Flask", icon: SiFlask, color: "#000000" },
    { name: "OpenCV", icon: SiOpencv, color: "#5c3ee8" },
    { name: "Docker", icon: SiDocker, color: "#2496ed" },
    { name: "Linux", icon: SiLinux, color: "#fcc624" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "R", icon: SiR, color: "#276dc3" },
    { name: "Pandas", icon: SiPandas, color: "#150458" },
    { name: "NumPy", icon: SiNumpy, color: "#013243" },
    { name: "Plotly", icon: SiPlotly, color: "#3f4f75" },
    { name: "Tableau", icon: SiTableau, color: "#e97627" },
    { name: "Postman", icon: SiPostman, color: "#ff6c37" },
    { name: "GitHub", icon: SiGithub, color: "#181717" },
    { name: "Microsoft", icon: BiLogoMicrosoft, color: "#00a1f1" },
  ];

  return (
    <Column fillWidth marginBottom="xl">
      <Heading as="h2" id="Tech Stacks" variant="display-strong-s" marginBottom="m">
        Tech Stacks
      </Heading>
      <Flex fillWidth gap="12" wrap>
        {stacks.map((stack, index) => {
          const IconComponent = stack.icon;
          return (
            <Flex
              key={index}
              vertical="center"
              horizontal="center"
              padding="12"
              gap="8"
              border="neutral-medium"
              radius="m"
              background="neutral-weak"
              style={{ 
                minWidth: "48px",
                minHeight: "48px",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = stack.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--neutral-border-medium)";
              }}
            >
              <IconComponent 
                size={24} 
                style={{ color: stack.color }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Column>
  );
}
