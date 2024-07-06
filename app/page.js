'use client'

import { useEffect, useState } from "react";
import { axiosInstace } from "./lib/axios";
import { CallApi } from "./features/animes";
import {
  useQueries,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "react-query";


import Content from "./page/content";
import Navbar from "./page/navbar";
import AnimeDetail from "./page/animeDetail";
import Jumbotron from "./page/jumbotron";
// import Pagination from "./page/pagination";
import Footer from "./page/footer";

export default function Home() {

  const [endpoint, setEndpoint] = useState('ongoing');
  const [page, setPage] = useState('1');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(true)


  //request data ke api



  const { data } = CallApi({ endpoint, page, setLoading });


  // if(loading){
  //   console.log('Mengambil data...')
  // }else{
  //   console.log(data);
  // }

  //bagian home
  return (
    <div className="flex flex-wrap justify-center">
      <Navbar setEndpoint={setEndpoint} setPage={setPage} setLoading={setLoading}/>
      <Container>
        {loading ?
        <BlankCard/>
          :
          <Page data={data} endpoint={endpoint} setEndpoint={setEndpoint} setPage={setPage} setLoading={setLoading}/>
         
        }


      </Container>


      <Footer />
    </div>
  )


}

function BlankCard(){
  return(
    <>  
        <Jumbotron/>
          <div className="w-40 h-60 m-5 bg-white">
            <h1>hallo</h1>
          </div>
          <div className="w-40 h-60 m-5 bg-white">
            <h1>hallo</h1>
          </div>
          <div className="w-40 h-60 m-5 bg-white">
            <h1>hallo</h1>
          </div>
          <div className="w-40 h-60 m-5 bg-white">
            <h1>hallo</h1>
          </div>
          <div className="w-40 h-60 m-5 bg-white">
            <h1>hallo</h1>
          </div>
        </>
  )
}
function Page({ endpoint, data, setEndpoint, setPage, setLoading }) {
  return (
    <>
      {/* menampilkan anime list */}
      {(endpoint == 'ongoing' || endpoint == 'completed') &&
      <>
        <Jumbotron/>
        <Content data={data} endpoint={endpoint} setEndpoint={setEndpoint} setPage={setPage} setLoading={setLoading}/>
      </>

      }

      {/* show anime detail */}

      {
        endpoint == 'detail' &&
        <AnimeDetail animesDetail={data}/>
      }

      {/* display searching anime */}
      {
        endpoint == 'search' &&
        <Content data={data} endpoint={endpoint} setEndpoint={setEndpoint} setPage={setPage} setLoading={setLoading}/>
      }
    </>
  )
}
function Container({ children }) {
  return (
    <div className="anime text-white pb-5 flex items-center mt-10 flex-wrap justify-center w-full mx-20 mb-20">
      {children}
    </div>
  )
}


