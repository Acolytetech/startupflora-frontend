import React, { useEffect, useState } from "react";
import "./ourpartner.css";
import createClient from "../../../Client"; // Ensure client is set up correctly

const Ourpartner = () => {
  const [ourPartners, setOurpartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchourpartner = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "ourpartner"] | order(publishedAt desc) {
              partnerimage {
                asset -> {
                  url
                }
              },
              headline,
              slug,
              publishedAt

            }`
        );
        setOurpartners(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch hero section data:", error);
        setLoading(false);
      }
    };

    fetchourpartner();
  }, []);

  // Show loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if no data is available
  if (!ourPartners.length) {
    return <div>No hero section data found.</div>;
  }

  return (
    <section className="ourpatner">
      <div className="partners-logo-slider">
        <p className="sliderTitle">Our Partners</p>
        <div className="slide-track">
          {ourPartners.map((partner, index) => (
            <div key={index} className="slide">
              <img
                src={partner.partnerimage.asset.url}
                alt={partner.headline}
              />
              <div className="slide viewAll">
                <button></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ourpartner;
