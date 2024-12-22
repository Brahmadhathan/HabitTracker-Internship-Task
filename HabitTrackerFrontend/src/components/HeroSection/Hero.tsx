import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
function Hero() {
  const MotionButton = motion(Button);

  return (
    <section className="pt-40 pb-20 px-5 ">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-600">The #1 Habit Tracking Platform</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight"
        >
          Your identity emerges out of your{" "}
          <span className="text-indigo-600">habits</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
          className="max-w-3xl mx-auto  text-xl text-gray-600 mb-8 "
        >
          {" "}
          Transform your life through the power of consistent habits. Track,
          analyze, and improve your daily routines with our intuitive platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
        >
          <MotionButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
            className="flex gap-3 mx-auto py-7 px-5 rounded-lg  bg-indigo-500 hover:bg-indigo-600 text-lg"
          >
            Start Your Journey
            <motion.span
              initial={{ opacity: 0, x: 0, scaleX: 1 }}
              animate={{
                opacity: 1,
                x: 10,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <ArrowRight size={48} className="w-6 h-6 " strokeWidth={2} />
            </motion.span>
          </MotionButton>
        </motion.div>
        <div className="mt-12 max-w-2xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="rounded-2xl overflow-hidden  "
          >
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072"
              alt="person completing task"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
