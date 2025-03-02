import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        {postData.title}
      </Head>
      <article>
        {postData.title}
        <h1 className={utilStyles.headingXl}></h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}