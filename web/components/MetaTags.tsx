import Head from "next/head";

type TProps = {
  title?: string;
  description?: string;
  image?: string;
};

export default function MetaTags({
  title,
  description = "An event monitoring app",
  image = "TODO: LOGO IMAGE URL",
}: TProps) {
  if (!title) {
    title = "SinceTill.com";
  } else {
    title += " | SinceTill.com";
  }
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sincetill" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
