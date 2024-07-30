import React from "react";
import { motion } from "framer-motion";

function Button({ children, textOnly, className, ...props }) {
  const cssClasses = textOnly
    ? `text-button ${className}`
    : `button ${className}`;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cssClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
}
export default Button;
