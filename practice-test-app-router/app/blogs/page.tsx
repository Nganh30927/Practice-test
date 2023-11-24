/**
 * Server component
 */
import { Metadata } from 'next'
import Link from 'next/link';

/**
 * Title cho các trang tĩnh
 */
export const metadata: Metadata = {
  title: 'Products Page',
}

type IBlog = {
  _id?: string;
  title: string;
  keyword: string;
  description: string;
  content: string;
  date: Date;

}

/**
 * Mặc định fetch sẽ được nextjs cache kết quả
 * @returns Mă
 */
const fetchBlogs = async () => {
  const res = await fetch(`http://localhost:8080/api/v1/articles`, { next: { revalidate: 30 } });
  const data = await res.json();
  return data.data; // Adjust based on the actual structure
}



export default async function Page() {
  const blogs: IBlog[] = await fetchBlogs();
  return (
    <>
      <h1>Blogs Page</h1>

      <ul>
        {
          blogs.map((item) => {
            return <li key={item._id}>
              <Link href={`blogs/${item._id}`}> {item.title}</Link>
            </li>
          })
        }
      </ul>

    </>
  )
}
