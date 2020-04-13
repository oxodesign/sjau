import React from "react";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useLocation } from "react-router-dom";
type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};
export const Layout: React.FC<LayoutProps> = ({
  title,
  description,
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
      </Helmet>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};
