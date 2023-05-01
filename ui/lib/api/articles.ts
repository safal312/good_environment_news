import clientPromise from '@/lib/mongodb';

export interface ScoresProps {
  pos: number;
  neg: number;
  neu: number;
  compound: number;
}

export interface LatestArticleProps {
    _id: string;
    title: string;
    body: string;
    link: string;
    image: string;
    date: string;
    scores: ScoresProps;
    source: string;
    keywords: Array<string>;
    greenwashing: number;
  }

export async function getLatestArticles(): Promise<LatestArticleProps[]> {
    const client = await clientPromise;
    const collection= client.db(process.env.DB).collection(process.env.COLLECTION as string)
    const result = await collection.find<LatestArticleProps>({}).toArray()

    return result.map((article) => ({
        _id: article._id.toString(),
        title: article.title,
        body: article.body,
        link: article.link,
        image: article.image,
        date: article.date,
        scores: article.scores,
        source: article.source,
        keywords: article.keywords ? article.keywords : [],
        greenwashing: article.greenwashing
      }));
}
  