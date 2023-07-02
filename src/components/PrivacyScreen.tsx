import { motion, useIsPresent } from "framer-motion";

const PrivacyScreen = () => {
  const isPresent = useIsPresent();

  return (
    <motion.div
      initial={{ scaleX: 1 }}
      animate={{
        scaleX: 0,
        transition: { duration: 0.5, ease: "circOut" },
      }}
      exit={{
        scaleX: 1,
        transition: { duration: 0.5, ease: "circIn" },
      }}
      style={{ originX: isPresent ? 0 : 1 }}
      className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black"
    />
  );
};

export default PrivacyScreen;
