function Short_description({ items }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: items?.short_description,
      }}
    />
  );
}

export default Short_description;