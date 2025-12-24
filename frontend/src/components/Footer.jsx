import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white">LearnHub</h2>
                    <p className="mt-4 text-sm">
                        LearnHub is an online learning platform where you can learn
                        skills from industry experts anytime, anywhere.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Home</li>
                        <li className="hover:text-white cursor-pointer">Courses</li>
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Categories
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Web Development</li>
                        <li className="hover:text-white cursor-pointer">Video Editing</li>
                        <li className="hover:text-white cursor-pointer">Graphic Design</li>
                        <li className="hover:text-white cursor-pointer">Digital Marketing</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Support
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-white cursor-pointer">Help Center</li>
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-10">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-sm">
                        © {new Date().getFullYear()} LearnHub. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <FaFacebookF className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                        <FaLinkedin className="hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
