import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ITHome() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          startExitAnimation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startExitAnimation = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/it-dashboard"), 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-60 h-60 md:w-80 md:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.98, 
          y: 20,
          transition: { duration: 0.5 }
        }}
        className="backdrop-filter backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-md text-center space-y-6 relative overflow-hidden"
      >
        {/* IT Team Portal Label */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wide uppercase inline-block"
        >
          IT Team Portal
        </motion.div>

        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotate: 0,
            transition: { 
              type: "spring", 
              damping: 10, 
              stiffness: 100,
              delay: 0.3
            }
          }}
          whileHover={{ scale: 1.05 }}
          className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md flex items-center justify-center"
        >
          <motion.span 
            className="text-white text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            VB
          </motion.span>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IT Team</span>
          </h1>
          <p className="text-base text-gray-600 mt-2 max-w-md mx-auto">
            Your system management dashboard is loading
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-6 px-2">
          <div className="relative w-full h-2 bg-gray-200/80 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            />
          </div>
          
          <div className="flex justify-between mt-2 items-center">
            <span className="text-xs text-gray-500 font-medium">Initializing systems...</span>
            <span className="text-xs font-semibold text-indigo-600 flex items-center">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mr-1"
              >
                ●
              </motion.span> 
              Live
            </span>
          </div>
        </div>

        {/* Skip Button */}
        <motion.button
          onClick={startExitAnimation}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.2)"
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm rounded-full shadow-sm transition-all duration-300"
        >
          Enter Dashboard Now
        </motion.button>
        
        <p className="text-xs text-gray-500 mt-3">
          Redirecting in <span className="font-medium text-indigo-600">{countdown}</span> seconds...
        </p>
      </motion.div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default ITHome;