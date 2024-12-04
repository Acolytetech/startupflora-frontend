import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Testimonial.module.css";
import video from "../../../image/video/Video.mp4";
import createClient from "../../../Client";
import { PortableText } from "@portabletext/react";

function Testimonial({ navRef }) {
  const navHeight = navRef.current?.clientHeight || 80;
  const [testimonialContentData, setTestimonialContentData] = useState([]);
  const [testimonialsliderData, setTestimonialsliderData] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [sliderLoading, setSliderLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonialContentData = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "testimonialcontent"] | order(_createdAt desc) {
            headline,
            subheading,
            description,
            slug,
          }`
        );
        setTestimonialContentData(data);
        setContentLoading(false);
      } catch (error) {
        console.error("Failed to fetch testimonial content data:", error);
        setError("Failed to load content data");
        setContentLoading(false);
      }
    };

    fetchTestimonialContentData();
  }, []);

  useEffect(() => {
    const fetchTestimonialsliderData = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "testimonial"] | order(_createdAt desc) {
            image{
              asset -> {
                url
              }
            },
            name,
            text,
            slug,
            role,
            description,
            publishedAt
          }`
        );
        setTestimonialsliderData(data);
        setSliderLoading(false);
      } catch (error) {
        console.error("Failed to fetch testimonial slider data:", error);
        setError("Failed to load slider data");
        setSliderLoading(false);
      }
    };

    fetchTestimonialsliderData();
  }, []);

  if (contentLoading || sliderLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const content = testimonialContentData[0];

  return (
    <section
      style={{ height: `calc(90vh - ${navHeight}px)` }}
      className={styles.testimonial}
    >
      <video
        className={styles.backgroundVideo}
        src={video}
        autoPlay
        muted
        loop
      ></video>

      <div className={styles.container}>
        <div className={styles.mainImage}>
          <h3 className={styles.heading} data-aos="fade-right">{content.headline}</h3>
          <p className={styles.subheading} data-aos="fade-right">
            {content.subheading || "Because Your Startup Deserves the Best Start"}
          </p>
          <p className={styles.benefitsList} data-aos="fade-right">
            <PortableText value={content.description || []} />
          </p>
        </div>

        <div
          style={{
            width: "300px",
            maxWidth: "350px",
            position: "relative",
          }}
        >
          <div className={styles.swiper}>
            <Swiper
              data-aos="zoom-in"
              direction="vertical"
              loop={true}
              speed={5000} // You can adjust this based on the desired scroll speed
              autoplay={{
                delay: 0, // Adjust the delay to match the slide speed
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]}
              className={styles.swiperContainer}
              breakpoints={{
                320: { 
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {testimonialsliderData.map((testimonial) => (
                <SwiperSlide key={testimonial.slug.current} className={styles.card}>
                  <div className={styles.cardContent}>
                    <img
                      src={testimonial.image.asset.url}
                      alt={testimonial.name}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardText}>
                      <h4>{testimonial.name}</h4>
                      <p className={styles.role}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={styles.quote}>{testimonial.text}</p>
                  <p className={styles.details}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: testimonial.description,
                      }}
                    ></span>
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
