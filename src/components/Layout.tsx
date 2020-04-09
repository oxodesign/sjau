import React from "react";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
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
