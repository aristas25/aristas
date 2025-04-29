const brand = process.env.BRAND || "DEFAULT";
const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
const baseUrlApi =
  process.env.REACT_APP_BASE_URL_API || "http://localhost:3000/api";

export const config = {
  brand,
  email: "info@aristas.com",
  phone: "+1 (123) 456-7890",
  address: "123 Main St, City, Country",
  socialMedia: {
    facebook: "https://facebook.com/aristas",
    twitter: "https://twitter.com/aristas",
    instagram: "https://instagram.com/aristas",
    linkedin: "https://linkedin.com/company/aristas",
  },
  baseUrl,
  baseUrlApi,
  defaultUserImage:
    "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
  imgbbApiKey: "f369e564a35464c187abaecc81d252ab",
  email: "info@aristas.com",
  phone: "+1 (123) 456-7890",
  address: "123 Main St, City, Country",
  socialMedia: {
    facebook: "https://facebook.com/aristas",
    twitter: "https://twitter.com/aristas",
    instagram: "https://instagram.com/aristas",
    linkedin: "https://linkedin.com/company/aristas",
  },
  theme: {
    logo: baseUrl + "/static/media/logo.103b5fa18196d5665a7e12318285c916.svg",
    colors: {
      primaryColor: "blue",
      secondaryColor: "#7A8499",
      tertiaryColor: "#F5A623",
      quaternaryColor: "#9013FE",
      textMenuBrandColor: "#FFFFFF",
      textMenuColor: "#FFFFFF",
      textMenuHoverColor: "#FFFFFF",
    },
  },
};
