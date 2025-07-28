import { motion } from "motion/react";

const LoadingPropertyCard: React.FC = () => {
  return (
    <div className="max-h-48 flex items-center gap-6 bg-[#21222D] p-2 rounded-md">
      <div className="relative w-48 h-40 rounded-md overflow-hidden">
        {/* Layer 1: Red → Yellow */}
        <motion.div
          className="w-48 h-44 rounded-md"
          animate={{
            backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <motion.div
          className="w-96 h-6 rounded-md"
          animate={{
            backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="flex items-center gap-2">
          <motion.div
            className="w-28 h-6 rounded-md"
            animate={{
              backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-28 h-6 rounded-md"
            animate={{
              backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-28 h-6 rounded-md"
            animate={{
              backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-24 h-6 rounded-md"
            animate={{
              backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-24 h-6 rounded-md"
            animate={{
              backgroundColor: ["#9CA3AF", "#E5E7EB", "#9CA3AF"], // gray-400 → gray-200 → gray-400
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPropertyCard;
