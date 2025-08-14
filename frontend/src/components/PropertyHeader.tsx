import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "framer-motion";
import { MdMenuOpen, MdClose } from "react-icons/md";
import {  FaBlog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { MdPerson } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

function PropertyHeader() {
  // State to manage the visibility of the mobile menu.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handelPropertysClick = () => {
  //   setIsMenuOpen(false);
  // }

  // Define animation variants for the menu.
  // 'initial' is the state when the component is first rendered.
  // 'animate' is the state when the component is open.
  // 'exit' is the state when the component is being removed from the DOM.
  const menuVariants: Variants = {
    initial: {
      y: "-100vh", // Start off-screen at the top
    },
    animate: {
      y: 0, // Move to the top of the screen
      transition: {
        type: "tween", // Use a simple tween for a smooth effect
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      y: "-100vh", // Exit by moving back up off-screen
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.3,
      },
    },
  };
  return (
    <div className="relative">
      {/* Menu open button, visible only on small screens */}
      <span
        className={`fixed bottom-4 right-4 bg-[#171717] p-2 rounded-2xl text-4xl cursor-pointer hover:text-gray-400 md:hidden z-50 text-white shadow-sm shadow-amber-700 ${
          isMenuOpen && "hidden"
        }`}
        onClick={() => setIsMenuOpen(true)}
      >
        <MdMenuOpen />
      </span>

      {/* AnimatePresence handles the 'exit' animation when the component is unmounted.
        This is crucial for the closing animation to play.
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-screen bg-[#171717] z-40 flex flex-col items-center justify-center overflow-hidden"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Menu close button */}
            <span
              className="absolute top-4 right-4 text-4xl cursor-pointer hover:text-gray-400 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdClose />
            </span>

            {/* Menu links */}
            <nav className="text-center">
              <ul className="flex flex-col gap-4">

                  <NavLink
                    to="/propertys"
                    className="hover:bg-[#262626] p-2 text-2xl font-semibold rounded-md text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <LuHouse />
                      Propertys
                    </span>
                  </NavLink>


                  <NavLink
                    to="/blogs" 
                    className="hover:bg-[#262626] p-2 text-2xl font-semibold rounded-md text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <FaBlog />
                      Blogs
                    </span>
                  </NavLink>


                  <NavLink
                    to="/clients"
                    className="hover:bg-[#262626] p-2 text-2xl font-semibold rounded-md text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <MdPerson />
                      Clients
                    </span>
                  </NavLink>

                  <NavLink
                    to="/settings"
                    className="hover:bg-[#262626] p-2 text-2xl font-semibold rounded-md text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <IoSettingsOutline />
                      Settings
                    </span>
                  </NavLink>

              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PropertyHeader;
