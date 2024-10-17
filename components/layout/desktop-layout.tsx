"use client";

import { ReactNode, useState } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconHome,
  IconTerminal2,
  IconNewSection,
  IconExchange,
  IconBrandX,
  IconBrandGithub,
} from "@tabler/icons-react";

export interface ZenithFlow {
  tokens: {
    colors: {
      background: {
        primary: string;
        secondary: string;
      };
      border: string;
      black: string;
      glass: string;
      white: string;
      active: string;
      warning: string;
      error: string;
      accent: {
        lilac: string;
        teal: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    fonts: {
      primary: string;
      secondary: string;
    };
  };
}

interface DesktopLayoutProps {
  zenithFlow: ZenithFlow;
  children: ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  zenithFlow,
  children,
}) => {
  const [isDockVisible, setIsDockVisible] = useState(false);

  const dockItems = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Terminal",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "New Window",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Flow",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Social",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const dockStyle = {
    backgroundColor: `${zenithFlow.tokens.colors.glass}`,
    borderColor: zenithFlow.tokens.colors.border,
    color: zenithFlow.tokens.colors.text.primary,
  };

  const iconStyle = {
    color: zenithFlow.tokens.colors.text.secondary,
  };

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{ backgroundColor: zenithFlow.tokens.colors.black }}
      onMouseMove={(e) => {
        const threshold = window.innerHeight - 50; // 50px from bottom
        setIsDockVisible(e.clientY > threshold);
      }}
    >
      {children}
      <AnimatePresence>
        {isDockVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 flex justify-center pb-4"
          >
            <FloatingDock
              items={dockItems.map((item) => ({
                ...item,
                icon: <div style={iconStyle}>{item.icon}</div>,
              }))}
              desktopClassName="backdrop-blur-md border-2"
              customStyles={dockStyle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
