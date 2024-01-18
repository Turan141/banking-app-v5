import React, { useEffect, useState, ReactNode, CSSProperties } from "react";
import { createPortal } from "react-dom";

interface PortalContainerProps {
  children: ReactNode;
  styles?: CSSProperties;
  darken?: boolean;
  onClose?: () => void;
}

export const PortalContainer: React.FC<PortalContainerProps> = ({
  children,
  styles,
  darken = false,
  onClose,
}) => {
  const [portalContainer] = useState(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(portalContainer);
    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);

  const handleBackgroundClick = () => {
    if (onClose) onClose();
  };

  return createPortal(
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          ...(darken
            ? { background: "rgba(0, 0, 0, 0.5)" }
            : { backdropFilter: "blur(5px)" }),
          zIndex: 2,
        }}
        onClick={handleBackgroundClick}
      />
      <div style={{ ...defaultStyles, ...styles }}>{children}</div>
    </>,
    portalContainer
  );
};

const defaultStyles: CSSProperties = {
  // Add default styles here if needed
  minWidth: "100%",
};