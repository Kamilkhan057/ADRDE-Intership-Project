import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function DirHome() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Start content animation slightly after component mounts
    const initialTimer = setTimeout(() => setShowContent(true), 200);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dir-dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, [navigate]);

  const handleSkip = () => {
    navigate("/dir-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-teal-100 overflow-hidden relative font-sans p-4">
      {/* Background Shapes - Adjusted for mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-0 w-60 h-60 md:w-80 md:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-60 h-60 md:w-80 md:h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-60 h-60 md:w-80 md:h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </>
      )}

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.7, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 50,
              transition: { duration: 0.5, ease: "easeIn" },
            }}
            className="backdrop-filter backdrop-blur-2xl bg-white/70 border border-white/90 shadow-2xl rounded-3xl py-6 px-4 sm:p-8 w-full max-w-md text-center space-y-4 relative overflow-hidden transform-gpu"
          >
            {/* Animated Logo - Moved to top */}
            <motion.div
              initial={{ y: -50, opacity: 0, rotate: -20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 150,
                delay: 0.3,
              }}
              whileHover={{ scale: isMobile ? 1 : 1.1, rotate: isMobile ? 0 : [0, 5, -5, 0] }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-blue-700 to-cyan-600 shadow-xl flex items-center justify-center cursor-pointer"
            >
              <motion.span
                className="text-white text-2xl sm:text-3xl font-extrabold tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              >
                VB
              </motion.span>
            </motion.div>

            {/* DIRECTOR PORTAL LABEL - Moved below logo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg tracking-wide uppercase inline-block"
            >
              Director Portal
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight leading-tight">
                Welcome,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Director
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-md mx-auto font-light">
                Your dedicated dashboard for managing venue operations.
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6 px-2">
              <div className="relative w-full h-1.5 sm:h-2 bg-gray-200/70 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-500 to-green-600 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]"
                />
              </div>

              <div className="flex justify-between mt-1 sm:mt-2 items-center">
                <span className="text-xs text-gray-500 font-medium">Loading your dashboard...</span>
                <span className="text-xs font-semibold text-green-600 flex items-center">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mr-0.5 text-sm"
                  >
                    ●
                  </motion.span>{" "}
                  Live
                </span>
              </div>
            </div>

            {/* Skip Button */}
            <motion.button
              onClick={handleSkip}
              whileHover={{
                scale: isMobile ? 1 : 1.03,
                boxShadow: "0 8px 20px rgba(20, 184, 166, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 sm:mt-5 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 relative overflow-hidden"
            >
              <span className="relative z-10">Proceed to Dashboard</span>
              <motion.span
                className="absolute inset-0 bg-white opacity-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: isMobile ? 0 : 0.15, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Redirecting text */}
            <p className="text-xs text-gray-500 mt-2 sm:mt-3 font-light">
              Automatically redirecting in <span className="font-bold text-teal-600">{countdown}</span> seconds...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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

        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .backdrop-filter {
            backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </div>
  );
}

export default DirHome;