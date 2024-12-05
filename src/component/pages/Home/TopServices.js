import React, { useEffect, useState } from "react";
import style from "./TopServices.module.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import createClient from "../../../Client";

const TopServices = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const [topservices, setTopServices] = useState([]);
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
        setTopServices(data);
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

  if (!topservices.length) {
    return <div>No hero section data found.</div>;
  }

  return (
    <div className={style.carouselContainer}>
      <h2>Our Top Services</h2>

      <div className={style.gridContainer} data-aos="zoom-in">
        {topservices.map((testimonial, index) => (
          <a
            key={index}
            href={testimonial.link}
            target="_blank"
            rel="noopener noreferrer"
            className={style.gridCard}
            onMouseMove={handleMouseMove}
            style={{
              '--x': `${mousePosition.x}px`,
              '--y': `${mousePosition.y}px`,
            }}
          >
            <div className={style.image}>
              <img
                src={testimonial.icon.asset.url}
                alt={testimonial.title}
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
