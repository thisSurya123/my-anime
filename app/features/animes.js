import { useState } from "react";
import { axiosInstace } from "../lib/axios";
import { useEffect } from "react";
import {
    useQueries,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
} from "react-query";



export const CallApi = ({ endpoint, page, setLoading }) => {

    const [anime, setAnime] = useState([]);


    const Response = async () => {
        setLoading(true)
        try {
            const animesResponse = await axiosInstace.get(`${endpoint}/${page}`);
            if (endpoint === 'ongoing') {
                setAnime(animesResponse.data.ongoing);
                setLoading(false)
            } if (endpoint === "completed") {
                setAnime(animesResponse.data.completed);
                setLoading(false)
            } if (endpoint === "detail") {
                setAnime(animesResponse.data);
                setLoading(false)
            } if (endpoint === "search") {
                setAnime(animesResponse.data.search)
                setLoading(false)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Response()
    }, [endpoint, page])



    return {
        data: anime,
    }


    // try {    
    //     if(endpoint === 'ongoing' || endpoint === 'completed' || endpoint === 'search'){
    //       const animeResponse = await axiosInstace.get(`/${endpoint}/${page}`)
    //     if (endpoint === 'ongoing') {
    //       setAnimes(animeResponse.data.ongoing);
    //       setIsloading(false)
    //     } if (endpoint === "completed") {
    //       setAnimes(animeResponse.data.completed);
    //       setIsloading(false)
    //     } if (endpoint === "detail") {
    //       setAnimesDetail(animesDetailResponse.data);
    //       setIsloading(false)
    //     } if (endpoint === "search") {
    //       setAnimes(animeResponse.data.search)
    //       setIsloading(false)
    //     }
    //   }else{
    //     const animeDetailResponse = await axiosInstace.get(`/${endpoint}/${slug}`);
    //     setAnimesDetail(animeDetailResponse.data)
    //     setIsloading(true)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
}