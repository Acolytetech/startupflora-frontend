import React, { useState, useEffect } from "react";
import './Footer 3.css';
// import logo from '../../image/logo only imge.png'
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { PiInstagramLogo } from "react-icons/pi";
import { TiSocialTwitterCircular } from "react-icons/ti";
import createClient from "../../Client";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [error, setError] = useState(false);
  // const [showSections, setShowSections] = useState({ // Sections visibility के लिए state
  // quickLinks: false,
  // contactUs: false,
  // followUs: false,
  // });
  const [activeSection, setActiveSection] = useState(null);


  // Fetch Footer Data
  useEffect(() => {
    createClient
      .fetch(`*[_type == "footer"][0]{
        companyName,
        tagline,
        "logo": logo.asset->url,
        quickLinks,
        socialMedia,
        contact
      }`
      )

      .then((data) => setFooterData(data))
      .catch(() => setError(true));

  }, []);
  console.log(error)

  if (!footerData) return <div>Loading...</div>;

  return (
    <footer className="footer">
      <div className="footerDestopContainer">
        {/* Company Logo */}
        <div className="footerdestop">
          <div className="footer-section footer-logo">
            {footerData.logo && <img src={footerData.logo} alt="Company Logo" />}
            <h2>{footerData.companyName}</h2>
            <p>{footerData.tagline}</p>
          </div>

          {/* Navigation Links */}
          <div className="footer-section footer-links"  data-aos="fade-up">
            <h3>Quick Links</h3>
            <ul>
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-section footer-contact"  data-aos="fade-up">
            <h3>Contact Us</h3>
            <p>Email: {footerData.contact.email}</p>
            <p>Phone: {footerData.contact.phone}</p>
            <p>Address: {footerData.contact.address}</p>
          </div>

          {/* Social Media Links */}
          <div className="footer-section footer-social"  data-aos="fade-up">
            <h3>Follow Us</h3>
            {footerData.socialMedia.map((social, index) => {
              let Icon;
              switch (social.platform.toLowerCase()) {
                case 'whatsaap':
                  Icon = FaWhatsapp;
                  break;
                case 'facebook':
                  Icon = TiSocialFacebookCircular;
                  break;
                case 'twitter':
                  Icon = TiSocialTwitterCircular;
                  break;
                case 'linkedin':
                  Icon = TiSocialLinkedinCircular;
                  break;
                case 'instagram':
                  Icon = PiInstagramLogo;
                  break;
                default:
                  Icon = null;
              }
              return (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} {footerData.companyName}. All rights reserved.
        </div>
      </div>

      {/* mobile View */}


      <div className="footerMobileContainer">
        <div className="footermobile">
          {/* Company Logo */}
          <div className="footer-section footer-logo">
            {footerData.logo && <img src={footerData.logo} alt="Company Logo" />}
            <h2>{footerData.companyName}</h2>
            <p>{footerData.tagline}</p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section footer-links">
            <div
              className="footer-header"
              onClick={() =>
                setActiveSection(activeSection === "quickLinks" ? null : "quickLinks")
              }
            >
              <h3>Quick Links</h3>
              {activeSection === "quickLinks" ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            {activeSection === "quickLinks" && (
              <ul>
                {footerData.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Us Section */}
          <div className="footer-section footer-contact">
            <div
              className="footer-header"
              onClick={() =>
                setActiveSection(activeSection === "contactUs" ? null : "contactUs")
              }
            >
              <h3>Contact Us</h3>
              {activeSection === "contactUs" ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            {activeSection === "contactUs" && (
              <div className="contactMobile">
                <p>Email: {footerData.contact.email}</p>
                <p>Phone: {footerData.contact.phone}</p>
                <p>Address: {footerData.contact.address}</p>
              </div>
            )}
          </div>

          {/* Social Media Links Section */}
          <div className="footer-section footer-social">
            <div
              className="footer-header"
              onClick={() =>
                setActiveSection(activeSection === "followUs" ? null : "followUs")
              }
            >
              <h3>Follow Us</h3>
              {activeSection === "followUs" ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
            {activeSection === "followUs" && (
              <div className="contactMobile">
                {footerData.socialMedia.map((social, index) => {
                  let Icon;
                  switch (social.platform.toLowerCase()) {
                    case "whatsapp":
                      Icon = FaWhatsapp;
                      break;
                    case "facebook":
                      Icon = TiSocialFacebookCircular;
                      break;
                    case "twitter":
                      Icon = TiSocialTwitterCircular;
                      break;
                    case "linkedin":
                      Icon = TiSocialLinkedinCircular;
                      break;
                    case "instagram":
                      Icon = PiInstagramLogo;
                      break;
                    default:
                      Icon = null;
                  }
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Icon && <Icon />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          © {new Date().getFullYear()} {footerData.companyName}. All rights reserved.
        </div>
      </div>



    </footer>
  );
};

export default Footer;
