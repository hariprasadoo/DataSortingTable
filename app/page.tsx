"use client"
// import Table from "./components/Table"
import SortableTable from './components/SortableTable';

export default function Home() {
  const data = [
    { name: 'Orange', color: 'bg-orange-500', score: 5 },
    { name: 'Apple', color: 'bg-red-500', score: 3 },
    { name: 'Banana', color: 'bg-yellow-500', score: 1 },
    { name: 'Lime', color: 'bg-green-500', score: 4 },
  ];

  const config = [
    {
      label: 'Name',
      render: (fruit: { name: any; }) => fruit.name,
      sortValue: (fruit: { name: any; }) => fruit.name,
    },
    {
      label: 'Color',
      render: (fruit: { color: any; }) => <div className={`p-3 m-2 ${fruit.color}`} />,
    },
    {
      label: 'Score',
      render: (fruit: { score: any; }) => fruit.score,
      sortValue: (fruit: { score: any; }) => fruit.score,
    },
  ];

  const keyFn = (fruit: { name: any; }) => {
    return fruit.name;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <SortableTable data={data} keyFn={keyFn} config={config} />
      </div>
    </main>
  )
}
