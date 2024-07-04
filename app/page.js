'use client'

import { useEffect, useState } from "react";
import { axiosInstace } from "./lib/axios";


import Content from "./page/content";
import Navbar from "./page/navbar";
import AnimeDetail from "./page/animeDetail";
import Jumbotron from "./page/jumbotron";
// import Pagination from "./page/pagination";
import Footer from "./page/footer";

export default function Home() {

  // const [animesOngoing, setAnimesOngoing] = useState([]);
  // const [animesCompleted, setAnimesCompleted] = useState([]);
  // const [animesSearch, setAnimeSearch] = useState([]);


  const [animes, setAnimes] = useState([]);
  const [animesDetail, setAnimesDetail] = useState([]);


  
  const [endpoint, setEndpoint] = useState('ongoing');
  const [page, setPage] = useState('1');
  const [slug, setSlug] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  //request data ke api
  const response = async () => {
    try {
        
        if(endpoint === 'ongoing' || endpoint === 'completed' || endpoint === 'search'){
          const animeResponse = await axiosInstace.get(`/${endpoint}/${page}`)
        if (endpoint === 'ongoing') {
          setAnimes(animeResponse.data.ongoing);
          setIsloading(false)
        } if (endpoint === "completed") {
          setAnimes(animeResponse.data.completed);
          setIsloading(false)
        } if (endpoint === "detail") {
          setAnimesDetail(animesDetailResponse.data);
          setIsloading(false)
        } if (endpoint === "search") {
          setAnimes(animeResponse.data.search)
          setIsloading(false)
        }
      }else{
        const animeDetailResponse = await axiosInstace.get(`/${endpoint}/${slug}`);
        setAnimesDetail(animeDetailResponse.data)
        setIsloading(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    response()
  }, [endpoint, page, slug, isLoading])


  //bagian home
  return (
    <div className="flex flex-wrap justify-center">
      <Navbar setEndpoint={setEndpoint} setPage={setPage} />

      {(endpoint == 'ongoing'  || endpoint == 'completed') &&
        <Container>

          <Jumbotron />
          <h2 className="w-full text-xl text-center bg-blue-900  text-white py-4 font-black">Anime On-Going</h2>
          <Content data={animes} endpoint='ongoing' setEndpoint={setEndpoint} setSlug={setSlug} isLoading={isLoading}/>

          {/* <Paggination setPage={setPage} /> */}
        </Container>
      }

      {endpoint == 'detail' &&

      <Container className="items-center">
       <AnimeDetail animesDetail={animesDetail} isLoading={isLoading} />
      </Container>
      }

      {endpoint == 'search'  &&
        <Container>
          <Content data={animes} endpoint='completed' setPage={setPage} />
        </Container>
      }


      <Footer />
    </div>
  )


}
function Container({ children }) {
  return (
    <div className="anime text-white pb-5 flex flex-wrap justify-center w-full mx-20 mb-20">
      {children}
    </div>
  )
}


