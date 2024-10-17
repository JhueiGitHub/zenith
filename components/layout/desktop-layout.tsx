"use client";

import { ReactNode, useState, useEffect } from "react";
import { FloatingDock } from "../ui/floating-dock";
import { AppWindow } from "../ui/app-window";
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
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [desktopSize, setDesktopSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDesktopSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const dockItems = [
    { title: "Home", icon: <IconHome className="h-full w-full" />, id: "home" },
    {
      title: "Terminal",
      icon: <IconTerminal2 className="h-full w-full" />,
      id: "terminal",
    },
    {
      title: "New Window",
      icon: <IconNewSection className="h-full w-full" />,
      id: "new-window",
    },
    {
      title: "Flow",
      icon: <IconExchange className="h-full w-full" />,
      id: "flow",
    },
    {
      title: "Social",
      icon: <IconBrandX className="h-full w-full" />,
      id: "social",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      id: "github",
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

  const handleAppOpen = (appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
  };

  const handleAppClose = (appId: string) => {
    setOpenApps(openApps.filter((id) => id !== appId));
  };

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{ backgroundColor: zenithFlow.tokens.colors.black }}
      onMouseMove={(e) => {
        const threshold = window.innerHeight - 50;
        setIsDockVisible(e.clientY > threshold);
      }}
    >
      {children}
      {openApps.map((appId) => {
        const app = dockItems.find((item) => item.id === appId);
        return (
          <AppWindow
            key={appId}
            zenithFlow={zenithFlow}
            title={app?.title || "Untitled"}
            isOpen={true}
            onClose={() => handleAppClose(appId)}
            onMinimize={() => {}}
            onMaximize={() => {}}
          />
        );
      })}
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
              onItemClick={handleAppOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
