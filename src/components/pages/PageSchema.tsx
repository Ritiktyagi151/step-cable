type PageSchemaProps = {
  schema: string[];
};

export function PageSchema({ schema }: PageSchemaProps) {
  return (
    <>
      {schema.map((item, index) => (
        <script key={index} type="application/ld+json">
          {item}
        </script>
      ))}
    </>
  );
}
