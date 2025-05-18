import { Metadata, Viewport } from "next";

export const defaultWebsiteViewport: Viewport = {
  themeColor: "#5C57E8",
  maximumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://invoice.gg"),
  title: "Invoice - Create Beautiful & Professional Invoices",
  description:
    "Invoice is a simple and easy to use invoice generator where you can create beautiful and professional invoices in minutes.",
  icons: {
    icon: "/official/invoice-logo.png",
  },
  keywords: [
    "invoice",
    "invoice generator",
    "invoice maker",
    "invoice creator",
    "invoice template",
    "invoice software",
    "invoice app",
    "invoice tool",
    "invoice system",
    "invoice management",
    "invoice.gg",
  ],
};

export interface IGenerateWebsiteMetadata {
  title: string;
  description?: string;
  image?: string;
  keywords?: string[];
}

export const generateWebsiteMetadata = ({
  title,
  description,
  image,
  keywords,
}: IGenerateWebsiteMetadata): Metadata => {
  return {
    ...metadata,
    keywords: [...(metadata.keywords || []), ...(keywords || [])],
    title: title || metadata.title,
    description: description || metadata.description,
    openGraph: {
      images: image || metadata.openGraph?.images,
    },
  };
};
