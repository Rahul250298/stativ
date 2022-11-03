export async function getStaticPaths() {
  const paths = [{ params: { site: "test" } }, { params: { site: "test2" } }];

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async (context: any) => {
  const data = [
    { domain: "test", data: "My first test project" },
    { domain: "test2", data: "My second test project" },
  ];

  console.log({params: context.params});
  const project = data.find((p) => p.domain === context.params.site);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: { project },
  };
};

export default function Index({ project }: any) {
  return <h1>{project.data}</h1>;
}