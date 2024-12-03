import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import createClient from "../../../Client"; // Ensure client is set up correctly
import TopServices from "./TopServices";

export default function Banner({ navRef }) {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navHeight = navRef.current?.clientHeight || 80;

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "heroSection"] | order(publishedAt desc) {
            backgroundImage {
              asset -> {
                url
              }
            },
            headline,
            subheadline,
            slug {
              current
            },
            ctaButton {
              label,
              link
            }
          }`
        );
        setHeroData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch hero section data:", error);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Show loading indicator
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Show error message if no data is available
  if (!heroData.length) {
    return <div className={styles.error}>No hero section data found.</div>;
  }

  return (
    <section className={styles.banner} >
      {heroData.map((item) => (
        <div
        className={styles.bannerImage}
          style={{

            // background: "red",
            color: "white",
            backgroundImage: `url(${item.backgroundImage.asset.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(6%)",
            height: "100vh",
          }}
        >
          <div className={styles.banner} key={item.slug.current}>
            {/* Overlay Content */}
            <div className={styles.container}>
              <h2 className={styles.bannerHeading}>{item.headline}</h2>
              <p className={styles.bannerPera} dangerouslySetInnerHTML={{__html: item.subheadline}}>
              </p>
              {item.ctaButton?.link && item.ctaButton?.label && (
                <a
                  href={item.ctaButton.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.KnowBtn}
                >
                  {item.ctaButton.label}
                </a>
              )}
            </div>

           <div className={styles.bannerTopServices}>
           <TopServices />
           </div>
          </div>
        </div>
      ))}
    </section>
  );
}
