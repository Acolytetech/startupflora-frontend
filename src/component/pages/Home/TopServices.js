import React, { useEffect, useState } from "react";
import style from "./TopServices.module.css";
// import { gst, seedFunding, Startup, tax, trademark } from "../../../image/svg";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import  createClient  from "../../../Client";

// const topservices = [
//   {
//     name: "Seed Funding Consulting",
//     image: seedFunding,
//     href: "https://www.startupflora.com/seed-funding-consultancy",
//   },
//   {
//     name: "Startup India Registration",
//     image: Startup,
//     href: "https://www.startupflora.com/startup-india-registration",
//   },
//   {
//     name: "Trademark Registration",
//     image: trademark,
//     href: "https://www.startupflora.com/trademark-registration",
//   },
//   {
//     name: "Startup India Tax Exemption",
//     image: tax,
//     href: "https://www.startupflora.com/startup-india-tax-exemption",
//   },
//   {
//     name: "GST Input Tax Credit",
//     image: gst,
//     href: "https://www.startupflora.com/gst-registration",
//   },
// ];






const TopServices = () => {

  const [topservices ,settopservices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "topservice"] {
            title,
            icon {
              asset -> {
                url
              }
            },
            link
          }`
        );
        settopservices(data);
      } catch (error) {
        console.error("Failed to fetch top services:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTopServices();
  }, []);
  
        
            if (loading) {
              return <div>Loading...</div>;
            }
          
            // Show error message if no data is available
            if (!topservices.length) {
              return <div >No hero section data found.</div>;
            }
  return (
    <div className={style.carouselContainer}>
      <h2>Our Top Services</h2>

      <div className={style.gridContainer}>
        {topservices.map((testimonial, index) => (
          <a
            key={index}
            href={testimonial.link}
            target="_blank"
            rel="noopener noreferrer"
            className={style.gridCard}
          >
            <div className={style.image}>
              <img
                src={testimonial.icon.asset.url}
                alt={testimonial.icon}
                className={style.image}
              />
            </div>

            <h4 className={style.name}>{testimonial.title}</h4>
          </a>
        ))}
        <div className={`${style.gridCardbtn} , ${style.btn}`}>
          <button className={style.button}>
            <FaRegArrowAltCircleRight className={style.arrowicon} /> <br />
            View All{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopServices;