import { useState } from 'react';
import Table from './Table';
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

interface ITable {
    data: {
      name: string;
      color: string;
      score: number;
    }[];
    config: {
      header?: () => JSX.Element;
      label: string;
      render: (fruit: any) => any;
      sortValue?: (fruit: any) => any;
    }[];
    keyFn: (rowData: any) => any;
  }

function SortableTable({ data, config, keyFn }: ITable) {
  const [sortOrder, setSortOrder] = useState<string | null>(null);
const [sortBy, setSortBy] = useState<string | null>(null);

  const handleClick = (label:string) => {
    if (sortBy && label !== sortBy){
      setSortOrder('asc');
      setSortBy(label)
      return;
    }
    if (sortOrder === null) {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortBy(null);
    }
  };

  const updatedConfig = config.map((column: any) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th className='cursor-pointer hover:bg-zinc-500' onClick={() => handleClick(column.label)}>
          <div className='flex items-center'>
           {column.label}
           {gitIcons(column.label, sortBy, sortOrder)}
          </div>
        </th>
      ),
    };
  });

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting
  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue }: any = config.find((column: any ) => column.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return (
    <div>
      {/* {sortOrder} - {sortBy} */}
      <Table data={sortedData} keyFn={keyFn} config={updatedConfig} />
    </div>
  );  
}

function gitIcons(label: any, sortBy: string | null, sortOrder: string | null){
  if(label != sortBy){
    return <div><GoTriangleUp/><GoTriangleDown/></div>
  }
  if(sortOrder === null){
    return <div><GoTriangleUp/><GoTriangleDown/></div>
  } else if (sortOrder === 'asc'){
    return <div><GoTriangleUp/></div>
  } else if (sortOrder === 'desc'){
    return <div><GoTriangleDown/></div>
  }
}
export default SortableTable