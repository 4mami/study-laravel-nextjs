"use client";
import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
});

// 動的ルーティングのパスを取得するためにparamsを引数として受け取る
const Page = (props: { params: Promise<{ id: string }> }) => {
    const params = use(props.params);
    // 生徒のデータを格納するstate
    const [student, setStudent] = useState<any>({});
    // router
    const router = useRouter();

    // LaravelのAPIにリクエストを送り、生徒のデータを取得する関数
    const getStudent = async () => {
        try {
            const response = await http.get(`api/students/${params.id}`);
            const json = await response.data;
            setStudent(json.data);
        } catch (e) {
            console.error(e);
        }
    }

    // ページが読み込まれたら生徒のデータを取得する
    useEffect(() => {
        getStudent();
    }, []);


    // 生徒の名前を更新する関数
    const updateStudent = async () => {
        // 更新するデータ
        const requestBody = {
            name: student.name,
        };
        // APIにリクエストを送信して、データを登録する
        http.put(`/api/students/${student.id}`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(()=>{
            // 登録が完了したら、生徒一覧ページに遷移する
            router.push('/students');
        });
    }

    return (
        <div>
            <div className="py-2 px-4">
                <p>IDが{params.id}番の生徒の名前を入力してください</p>
            </div>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='name'
                defaultValue={student.name}
                onChange={(e) => {
                    setStudent({
                        ...student,
                        name: e.target.value
                    });
                }}
            />
            <div>
                <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
                    onClick={()=>{
                        updateStudent();
                    }}
                >送信</button>
            </div>
        </div>
    );
}

export default Page;
