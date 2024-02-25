type ErrorDivProps = {
  error: string;
};
export default function ErrorDiv(props: ErrorDivProps) {
  const { error } = props;
  return (
    <div className="p-0 m-0">
      <p className="text-sm text-red-500">{error}</p>
    </div>
  );
}
