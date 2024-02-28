import emptyData from '/svgs/emptyData.svg';

export default function EmptyData(props: { items: string }) {
  const { items } = props;
  return (
    <div className="img flex flex-col items-center justify-center w-1/2 m-auto gap-5 mt-5">
      <img src={emptyData} alt="Svg" className="md:w-1/2" />
      <h1 className="font-medium text-lg text-gray-600 tracking-wider">{`No ${items} yet !`}</h1>
    </div>
  );
}
