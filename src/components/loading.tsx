const Loading = () => {
  return (
    <div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-xl bg-muted/50" />
      ))}
    </div>
  );
};

export default Loading;
