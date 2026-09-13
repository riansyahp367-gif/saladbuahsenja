const siteUrl = "https://saladbuahsenja-web.vercel.app";

const branches = [
  {
    name: "Salad Buah Senja - Tanjung Barangan Palembang",
    address: {
      streetAddress: "Jl. Tj. Bubuk, Bukit Baru, Kec. Ilir Bar. I",
      addressLocality: "Palembang",
      addressRegion: "Sumatera Selatan",
      postalCode: "30151",
      addressCountry: "ID",
    },
    mapUrl: "https://share.google/m7WQiRFkT66lnbIZw",
  },
  {
    name: "Salad Buah Senja Musi 6",
    address: {
      streetAddress:
        "Jl. Walikota H. Husni, 3-4 Ulu, Kecamatan Seberang Ulu I",
      addressLocality: "Palembang",
      addressRegion: "Sumatera Selatan",
      postalCode: "30122",
      addressCountry: "ID",
    },
    mapUrl: "https://share.google/h8iXxd1HK3cz0ph2m",
  },
  {
    name: "Salad Buah Senja Plaju Banten",
    address: {
      streetAddress: "Plaju Banten, 13 Ulu, Kec. Seberang Ulu II",
      addressLocality: "Palembang",
      addressRegion: "Sumatera Selatan",
      postalCode: "30114",
      addressCountry: "ID",
    },
    mapUrl: "https://share.google/iKQVpXIhQgb5jZjFJ",
  },
  {
    name: "Salad Buah Senja UIN Palembang",
    address: {
      streetAddress:
        "2PQX+FQ6, Jl. Rw. Jaya No.5, Pahlawan, Kec. Kemuning",
      addressLocality: "Palembang",
      addressRegion: "Sumatera Selatan",
      postalCode: "30126",
      addressCountry: "ID",
    },
    mapUrl: "https://maps.app.goo.gl/SsCVgGEftbmumtC9A",
  },
];

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FoodEstablishment",
        "@id": `${siteUrl}/#business`,
        name: "Salad Buah Senja",
        url: siteUrl,
        telephone: "+6281314720307",
        servesCuisine: "Fruit Salad",
        priceRange: "Rp10.000 - Rp20.000",
        areaServed: {
          "@type": "City",
          name: "Palembang",
        },
      },

      ...branches.map((branch, index) => ({
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#branch-${index + 1}`,
        name: branch.name,
        url: siteUrl,
        telephone: "+6281314720307",
        parentOrganization: {
          "@id": `${siteUrl}/#business`,
        },
        address: {
          "@type": "PostalAddress",
          ...branch.address,
        },
        hasMap: branch.mapUrl,
        areaServed: {
          "@type": "City",
          name: "Palembang",
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}