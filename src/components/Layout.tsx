import React from "react";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useLocation } from "react-router-dom";
import ogImageSrc from "../images/og-image.jpg";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};
export const Layout: React.FC<LayoutProps> = ({
  title,
  description = "Gjennomfør dugnader over tid med en sjau",
  children
}) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Helmet>
        <title>{title} | Sjau.no</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageSrc} />
        <meta property="og:url" content={`https://www.sjau.no${pathname}`} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageSrc} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};
