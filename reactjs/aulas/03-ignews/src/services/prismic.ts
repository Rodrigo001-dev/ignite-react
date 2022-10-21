import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.createClient(
    process.env.PRISMIC_ACCESS_TOKEN,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  );
  prismic.enableAutoPreviewsFromReq(req);

  return prismic;
};