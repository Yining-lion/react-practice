export default function TotalAmount({ total }: { total: number }) {
    return (
      <div className="text-lg font-bold">
        小計：{total}
      </div>
    );
  }
  