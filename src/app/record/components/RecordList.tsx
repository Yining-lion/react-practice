type Record = {
    id: string;
    amount: number;
    description: string;
    createdAt?: any;
  };

type Props = {
  records: Record[];
  onDelete: (id: string) => void;
};
  
  export default function RecordList({ records, onDelete }: Props) {


    return (
      <div className="">
        {records.map((r) => (
          <div key={r.id} className="flex justify-between items-center gap-45 my-5">
            <span className={`text-lg w-20 text-center ${r.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {r.amount}
            </span>
            <span className="text-lg">{r.description}</span>
            <button 
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
              onClick={() => onDelete(r.id)}
              >刪除</button>
          </div>
        ))}
      </div>
    );
  }
  