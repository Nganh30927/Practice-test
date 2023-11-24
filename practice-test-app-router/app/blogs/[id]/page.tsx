// import type { Metadata, ResolvingMetadata } from "next";

type PageProps = {
  params: { _id?: string };
}

interface BlogType {
  _id?: string;
  title: string;
    keyword: string;
    description: string;
    content: string;
    date: Date;
}


/**
 * Fetching Data on the Server 
 * @param id string
 * @returns object[]
 */
async function getData(_id: string) {
  const res = await fetch(`http://localhost:8080/api/v1/articles/${_id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

/**
 * generateMetadata
 * Sinh ra title động cho route khi id thay đổi
 */

export async function generateMetadata({ params }: PageProps) {
  // read route params
  const id = params._id;

  // ensure that id is defined before calling getData
  if (id !== undefined) {
    // fetch data
    const post = await getData(id);

    return {
      title: post.title,
    };
  } else {
    // handle the case where id is undefined
    console.error("ID is undefined");
    return {
      title: "Error",
    };
  }
}

export default async function Page({ params }: PageProps) {
  // read route params
  const id = params._id;

  // ensure that id is defined before calling getData
  if (id !== undefined) {
    // fetch data
    const post = await getData(id);

    return (
      <>
        <h2>Blogs Detail</h2>
        <h4>{post.title}</h4>
        <strong>{post.content}</strong>
        <p>{post.description}</p>
      </>
    );
  } else {
    // handle the case where id is undefined
    console.error("ID is undefined");
    return (
      <>
        <h2>Error</h2>
        <p>Failed to fetch blog details.</p>
      </>
    );
  }
}
/**
 * Tạo ra danh sách đường dẫn động /blog/:id
 * @returns object[]
 */
type ApiResponse = {
  data: BlogType[];
};

export async function generateStaticParams() {
  const response = await fetch("http://localhost:8080/api/v1/articles");
  const apiData: ApiResponse = await response.json();

  if (Array.isArray(apiData.data)) {
    // Cut out only the first 10 posts
    const newPost = apiData.data.slice(0, 10);

    return newPost
      .filter((post) => post._id !== undefined) // Exclude posts without id
      .map((post) => ({
        id: post._id,
      }));
  } else {
    // Handle the case where the data is not an array
    console.error("API response does not contain an array of posts");
    return [];
  }
}
