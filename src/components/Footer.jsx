import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 text-sm text-center py-4  border-t border-slate-700">
      <p>© {new Date().getFullYear()} Weather App. All rights reserved.</p>
      <p>Created for the Web Development Internship Coding Round</p>
    </footer>
  );
};

export default Footer;