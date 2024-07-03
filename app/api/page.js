'use client'


import { useEffect } from "react";
import { axiosInstace } from "../lib/axios"

export default function Api(){

    const response = async () => {
        const anime = await axiosInstace.get('/detail/opiece-sub-indo');
        console.log(anime)
    }

    useEffect(() =>{
        response();
    }, [])
    return(
        <h1>test</h1>
    )
}