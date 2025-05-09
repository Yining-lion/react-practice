"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/authContext";
import { db } from "../lib/firebase";
import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, query, orderBy} from "firebase/firestore";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";
import TotalAmount from "./components/TotalAmount";
import ProtectedRoute from "../auth/ProtectedRoute";

type Record = {
  id: string;
  amount: number;
  description: string;
  createdAt?: any;
};

export default function AccountingPage() {
  
  let [records, setRecords] = useState<Record[]>([]); // <Record[]>： 這是一個陣列，裡面每一項都是 Record 這種型別的物件
  let { user, loading } = useAuth();
  let router = useRouter();

  let addRecord = async (record: Omit<Record, "id">) => { // Omit<Type, 'key1' | 'key2'>： 從原本的物件型別中，拿掉某些欄位 (Typescript)
    if (!user) return;

    try { // 指定 Firestore 中的路徑：/users/{user.uid}/records
      let docRef = await addDoc(collection(db, "users", user.uid, "records"), { 
        ...record,
        createdAt: new Date(),
      });

       // 取得剛寫入的資料，立馬顯示在畫面上
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) { // docSnap 是 DocumentSnapshot 物件，一直會是 true，所以要加 exists()
        console.log(docSnap.data()) // {amount: -90, description: '飲料', createdAt: Timestamp} 這是 DocumentData 類型物件。若 docRef 指向不存在的文件，docSnap.data() 會是 null 或 undefined
        let newRecord = {
          id: docSnap.id,
          ...docSnap.data(),
        } as Record; // as 是 TypeScript 的「型別斷言」語法 (Type Assertion) // Firestore 回傳 DocumentData 類型物件是一個泛型型別，所以要用 as 來解決模糊型別
        /* type DocumentData = {
              [field: string]: any; // 這裡的 field 可以是任意的屬性名稱，且每個屬性值可以是任意型別
            }; */

        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error("寫入失敗:", err);
    }
  };

  useEffect(() => {
    let fetchRecords = async () => {
      if (!user) return;
      let q = query(
        collection(db, "users", user.uid, "records"),
        orderBy("createdAt", "asc") // 從舊到新由上往下排列
      );
      
      let snapshot = await getDocs(q); // snapshot 是 QuerySnapshot 物件
      let data = snapshot.docs.map((doc) => {
        let recordData = doc.data();
        return {
          id: doc.id,
          amount: recordData.amount,
          description: recordData.description,
          createdAt: recordData.createdAt,
        };
      }) as Record[];
      setRecords(data);
    };
  
    fetchRecords();
  }, [user]);

  let deleteRecord = async (id: string) => {
    if (!user) return;
  
    try {
      await deleteDoc(doc(db, "users", user.uid, "records", id));
      setRecords(prev => prev.filter(record => record.id !== id));
    } catch (err) {
      console.error("刪除失敗:", err);
    }
  };

  let handleGoHome = () => {
    router.push("/home");
  };

  let total = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <ProtectedRoute>
      <main className="flex flex-col justify-center items-center px-4 py-8 space-y-6">
        <h1 className="text-center text-xl font-semibold">
          您已經使用 {user?.email} 登入
        </h1>

        <RecordForm onAdd={addRecord}/>

        <RecordList records={records} onDelete={deleteRecord}/>

        <TotalAmount total={total} />

        <div className="text-center">
          <button
            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
            onClick={handleGoHome}
            >
            返回首頁
          </button>
        </div>

      </main>
    </ProtectedRoute>
    
  );
}