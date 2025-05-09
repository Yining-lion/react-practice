"use client";
import { useState } from "react"

type Item = { amount: number; description: string; }
type Props = { 
    onAdd: (record: Item) => void; 
}

export default function RecordForm({onAdd}: Props){
    let [type, setType] = useState("收入");
    let [amount, setAmount] = useState("0");
    let [description, setDescription] = useState("");
    
  
    let handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      let finalAmount = type === "支出" ? -Math.abs(Number(amount)) : Math.abs(Number(amount)); // 取絕對值
      if (description.trim() && Number(amount) !== 0) {
        onAdd({ amount: finalAmount, description });
        setAmount("0");
        setDescription("");
      } else {
        alert("請正確輸入");
      }
    };

    return (
        <form className="flex flex-wrap items-center gap-2" onSubmit={handleSubmit}>
            <select 
                className="border p-2 rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option>收入</option>
                <option>支出</option>
            </select>
            <input
                className="border p-2 rounded"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                className="border p-2 rounded"
                type="text"
                placeholder="說明"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                type="submit"
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
            >
                新增紀錄
            </button>
        </form>
    )
}
