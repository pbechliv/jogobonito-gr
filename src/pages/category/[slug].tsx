import Posts from "../../components/posts";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Category = ({ category, categories }: any) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} posts`,
  };

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <h1 className="text-2xl p-4 underline decoration-yellow-200">
        {category.attributes.name}
      </h1>
      <Posts posts={category.attributes.posts.data} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });

  return {
    paths: categoriesRes.data.map((category: any) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      posts: {
        populate: "*",
      },
    },
  });
  const allCategories = await fetchAPI("/categories");

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  };
}

export default Category;
