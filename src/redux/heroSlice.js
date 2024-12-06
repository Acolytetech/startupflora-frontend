import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createClient from "../Client";
import TopServices from "../component/pages/Home/TopServices";

// navbar
export const fetchNavbar = createAsyncThunk(
  "data/fetchNavbar",
  async (_, { rejectWithValue }) => {
    try {
      const data = await createClient.fetch(
        `*[_type == "navbar"][0] {
          brand,
          logo {
            asset -> { url }
          },
          menuItems[] {
            label,
            link,
            dropdownItems[] {
              label,
              link,
              subdropdownItems[] {
                label,
                link
              }
            }
          },
          ctaButton {
            label,
            link
          }
        }`
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch our Footer data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching hero section data
export const fetchHeroData = createAsyncThunk(
  "data/fetchHeroData",


  async (_, { rejectWithValue }) => {
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
      return data;
    } catch (error) {
      console.error("Failed to fetch hero section data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// top services
export const fetchTopServices = createAsyncThunk(
  "data/fetchTopServices",
  async (_, { rejectWithValue }) => {
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
      return data;
    } catch (error) {
      console.error("Failed to fetch topServices data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching testimonial content data
export const fetchTestimonialContentData = createAsyncThunk(
  "data/fetchTestimonialContentData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await createClient.fetch(
        `*[_type == "testimonialcontent"] | order(_createdAt desc) {
          headline,
          subheading,
          description,
          slug
        }`
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch testimonial content data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching testimonial slider data
export const fetchTestimonialSliderData = createAsyncThunk(
  "data/fetchTestimonialSliderData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await createClient.fetch(
        `*[_type == "testimonial"] | order(_createdAt desc) {
          image {
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
      return data;
    } catch (error) {
      console.error("Failed to fetch testimonial slider data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// our patners
export const fetchourpartner = createAsyncThunk(
  "data/fetchourpartner",
  async (_, { rejectWithValue }) => {
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
      return data;
    } catch (error) {
      console.error("Failed to fetch our partner data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// footer

export const fetchFooter = createAsyncThunk(
  "data/fetchFooter",
  async (_, { rejectWithValue }) => {
    try {
      const data = await createClient.fetch(
        `*[_type == "footer"][0]{
          companyName,
          tagline,
          "logo": logo.asset->url,
          quickLinks,
          socialMedia,
          contact
        }`
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch our Footer data:", error);
      return rejectWithValue(error.message);
    }
  }
);

console.log("fetchTopServices",fetchTopServices.pending)
  

const dataSlice = createSlice({
  name: "data",
  initialState: {
    NavbarData:[],
    heroData: [], 
    TopServicesData:[],
    data1: [], 
    data2: [],
    ourpatnerData:[],
    footerData: [],

    loading: false,
    navloading: false,
    heroloading: false,
    footerloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
// navbar
builder
.addCase(fetchNavbar.pending, (state) => {
  state.navloading = true;
  state.error = null;
})
.addCase(fetchNavbar.fulfilled, (state, action) => {
  state.navloading = false;
  state.Navbar = action.payload;
})
.addCase(fetchNavbar.rejected, (state, action) => {
  state.navloading = false;
  state.error = action.payload;
});

    // Hero Section
    builder
      .addCase(fetchHeroData.pending, (state) => {
        state.heroloading = true;
        state.error = null;
      })
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        state.heroloading = false;
        state.heroData = action.payload;
      })
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.heroloading = false;
        state.error = action.payload;
      });

      // topServices

      builder
    
      .addCase(fetchTopServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopServices.fulfilled, (state, action) => {
        state.loading = false;
        state.TopServicesData = action.payload; // Use the correct property name from initialState
      })
      .addCase(fetchTopServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Testimonial Content
    builder
      .addCase(fetchTestimonialContentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonialContentData.fulfilled, (state, action) => {
        state.loading = false;
        state.data1 = action.payload;
      })
      .addCase(fetchTestimonialContentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Testimonial Slider
    builder
      .addCase(fetchTestimonialSliderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonialSliderData.fulfilled, (state, action) => {
        state.loading = false;
        state.data2 = action.payload;
      })
      .addCase(fetchTestimonialSliderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


      // ourpatner
      builder
  .addCase(fetchourpartner.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchourpartner.fulfilled, (state, action) => {
    state.loading = false;
    state.ourpatnerData = action.payload;
  })
  .addCase(fetchourpartner.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // footer

  builder
  .addCase(fetchFooter.pending, (state) => {
    state.footerloading = true;
    state.error = null;
  })
  .addCase(fetchFooter.fulfilled, (state, action) => {
    state.footerloading = false;
    state.Footer = action.payload;
  })
  .addCase(fetchFooter.rejected, (state, action) => {
    state.footerloading = false;
    state.error = action.payload;
  });
  },
});

// our patner



export default dataSlice.reducer;
