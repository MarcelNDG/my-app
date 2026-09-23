import type { ReactNode } from "react";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

export const metadata = {
  title: "My Docs",
  description: "Documentation site built with Nextra",
};

const banner = (
  <Banner storageKey="site-banner">Documentation site built with Nextra</Banner>
);

const navbar = <Navbar logo={<b>My Docs</b>} />;

const footer = (
  <Footer>MIT {new Date().getFullYear()} - My Docs</Footer>
);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/your-org/your-repo/tree/main"
          copyPageButton={false}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}