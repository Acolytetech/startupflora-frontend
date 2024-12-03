import React from "react";
import Banner from "./Banner";
import Testimonial from "./Tesimonial";
import Ourpartner from "./Ourpartner";
import Newsletter from "./Newsletter";
// import TopServices from "./TopServices";

function Home({ navRef }) {
  return (
    <div>
      <Banner navRef={navRef} />
       {/* <TopServices/> */}
      <Testimonial navRef={navRef} />
      <Ourpartner />
      <Newsletter />
      {/* <Banner/> */}
    </div>
  );
}

export default Home;
