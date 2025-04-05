import React, { useState, useEffect } from "react";
import logo from "../images/logo.svg";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // For hamburger menu icons
import { motion, AnimatePresence } from "framer-motion"; // For animations

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const LoggedInNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // To track active route

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const navItems = [
    { label: "How it works?", path: "/how-it-works", variant: "ghost" },
    { label: "About", path: "/about", variant: "ghost" },
    { label: "History", path: "/contact", variant: "ghost" },
    { label: "Logout", path: "/login", variant: "default" },
  ];

  return (
    <div className="my-4 font-sfpro">
      <nav className="flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="h-4 sm:h-4 md:h-4 w-auto"
            />
            <p className="font-semibold text-sm sm:text-base md:text-lg">
              Acne-AI
            </p>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-xl focus:outline-none"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
          aria-expanded={isOpen}
        >
          <FiMenu />
        </button>

        {/* LINKS - Desktop View */}
        <div className="hidden md:flex gap-4 font-sfpro-med">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link to={item.path}>
                <Button variant={item.variant}>
                  {item.label}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* LINKS - Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-3xl focus:outline-none"
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
                aria-expanded={isOpen}
              >
                <FiX />
              </button>

              {/* Mobile Menu Items */}
              <div className="flex flex-col items-center gap-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link to={item.path} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={item.variant}
                        className="w-full text-center"
                      >
                        {item.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default LoggedInNavbar