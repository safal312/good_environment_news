import clientPromise from '@/lib/mongodb';

export interface LatestArticleProps {
    _id: string;
    title: string;
    body: string;
    link: string;
    image: string;
    date: string;
    scores: Object;
  }

export async function getLatestArticles(): Promise<LatestArticleProps[]> {
    const client = await clientPromise;
    const collection= client.db('newsdb').collection('aljazeera_latest')
    const result = await collection.find<LatestArticleProps>({}).toArray()
    return result.map((article) => ({
        _id: article._id.toString(),
        title: article.title,
        body: article.body,
        link: article.link,
        image: article.image,
        date: article.date,
        scores: article.scores,
      }));
}
  