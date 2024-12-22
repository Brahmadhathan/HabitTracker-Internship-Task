import { LineChart, Calendar, Trophy, Clock } from "lucide-react";
import {  motion } from "framer-motion";

function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
      title: "Daily Tracking",
      description:
        "Keep track of your habits with our intuitive daily tracking system",
    },
    {
      icon: <LineChart className="w-6 h-6 text-indigo-600" />,
      title: "Progress Analytics",
      description: "Visualize your progress with detailed charts and insights",
    },
    {
      icon: <Trophy className="w-6 h-6 text-indigo-600" />,
      title: "Achievement System",
      description: "Stay motivated with rewards and milestone celebrations",
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: "Reminders",
      description: "Never miss a habit with customizable reminders",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once:false }}
          transition={{ duration: 0.6}}
          className="mb-12 text-gray-900 text-center text-3xl font-bold"
        >
          {" "}
          Everything you need to build better habits
        </motion.h1>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-2 bg-indigo-50 w-fit rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
