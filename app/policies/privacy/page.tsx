// PrivacyPolicy.jsx

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-light-300 dark:bg-dark-100 text-black dark:text-white min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-dark-300 p-8 rounded shadow">
        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy governs the manner in which GWMY collects, uses,
          maintains, and discloses information collected from users (each, a
          'User') of the GWMY website (gwmy.yulluco.com). This privacy policy
          applies to the site and all products and services offered by GWMY.
        </p>

        <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          site, register on the site, and in connection with other activities,
          services, features, or resources we make available on our site.
        </p>

        {/* Add more sections as needed for your specific privacy policy content */}

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, the practices of
          this site, or your dealings with this site, please contact us at{" "}
          <a href="mailto:gwmy@yulluco.com" className="text-blue-500">
            gwmy@yulluco.com
          </a>
        </p>

        <p className="text-gray-500">
          This Privacy Policy was last updated on November 13, 2023.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
