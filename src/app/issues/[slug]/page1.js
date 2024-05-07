import DisplayIssue from "./displayIssue";

function Issue({ params }) {
  return (
    <>
      <meta
        name="description"
        content="This is a meta description. This text will show up in Google's search engine results page."
      />
      <meta
        name="description"
        content="This is a meta description. This text will show up in Google's search engine results page."
      />
      <DisplayIssue id={params.slug} />
    </>
  );
}

export default Issue;
