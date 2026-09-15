import { Helmet } from "react-helmet-async";

function SEO({ title, description, path = "", noIndex = false }) {
  const siteName = "DevVault";
  const siteUrl = "https://your-domain.com";
  const fullTitle = title ? `${siteName} - ${title}` : siteName;
  const url = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="/og-image.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/og-image.png" />

      <link rel="canonical" href={url} />

      <meta name="theme-color" content="#0B0B0F" />
    </Helmet>
  );
}

export default SEO;
