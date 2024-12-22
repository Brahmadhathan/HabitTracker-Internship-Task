import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

function AuthButton({text } : {text : string}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      type="submit"
      transition={{ ease: "easeInOut" }}
      className="w-80 md:w-96 mt-4 p-3 rounded-2xl bg-indigo-600 text-white flex justify-center gap-5 hover:bg-indigo-700"
    >
      {text}
      <span>
        <ArrowRight />
      </span>
    </motion.button>
  );
}

export default AuthButton;
