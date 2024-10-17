import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rnd } from "react-rnd";
import { ZenithFlow } from "@/components/layout/desktop-layout";
import { IconX, IconMinus, IconSquare } from "@tabler/icons-react";

interface AppWindowProps {
  zenithFlow: ZenithFlow;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  zenithFlow,
  title,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize();
  };

  const windowVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Rnd
          default={{
            x: 0,
            y: 0,
            width: "100%",
            height: "100%",
          }}
          minWidth={300}
          minHeight={200}
          bounds="parent"
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: zenithFlow.tokens.colors.background.secondary,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            border: `1px solid ${zenithFlow.tokens.colors.border}`,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <motion.div
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full h-full flex flex-col"
          >
            <div
              className="flex justify-between items-center p-2"
              style={{
                background: zenithFlow.tokens.colors.background.primary,
                borderBottom: `1px solid ${zenithFlow.tokens.colors.border}`,
              }}
            >
              <div className="flex space-x-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                />
                <button
                  onClick={onMinimize}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                />
                <button
                  onClick={handleMaximize}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                />
              </div>
              <div style={{ color: zenithFlow.tokens.colors.text.primary }}>
                {title}
              </div>
              <div className="w-16" /> {/* Spacer for symmetry */}
            </div>
            <div
              className="flex-grow p-4"
              style={{ color: zenithFlow.tokens.colors.text.secondary }}
            >
              {/* App content would go here */}
              <p>App content placeholder for {title}</p>
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
};
