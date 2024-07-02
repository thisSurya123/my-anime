'use client'

import { useEffect, useState } from "react";
import { axiosInstace } from "./lib/axios";

export default function Home() {

  const [animes, setAnimes] = useState([]);
  const [endpoint, setEndpoint] = useState('ongoing');
  const [page, setPage] = useState('1');

  //request data ke api
  const response = async () => {
    const animeResponse = await axiosInstace.get(`/${endpoint}/${page}`);
    if (endpoint === 'ongoing') {
      setAnimes(animeResponse.data.ongoing);
    } if (endpoint === "completed") {
      setAnimes(animeResponse.data.completed);
    } if (endpoint === "detail") {
      setAnimes(animeResponse.data);
    }
  }

  useEffect(() => {
    response()
  }, [endpoint, page, animes])

  return (
    <div className="bg-gray-900 flex flex-wrap md:w-5/6 md:mx-auto justify-center">
      <Navbar setEndpoint={setEndpoint} />
      <Jumbotron />
      <h2 className="w-full text-white">{`${endpoint}/${page}`}</h2>
      <h2 className="w-full text-xl text-center bg-white ">{endpoint}</h2>
      <Content data={animes} endpoint={endpoint} setEndpoint={setEndpoint} setPage={setPage} />
      <Paggination setPage={setPage} />
      <Footer />
    </div>
  );
}

function Navbar({ setEndpoint }) {
  return (
    <div className="flex justify-between bg-black p-5 w-full">
      <h1 className="text-white">My Anime</h1>
      <div className="flex items-center">
        <ul className="text-white flex mr-5">
          <li className="mx-2" onClick={() => {
            setEndpoint('ongoing')
          }}>Ongoing</li>
          <li className="mx-2" onClick={() => {
            setEndpoint('completed');
          }}>Compleate</li>
        </ul>
        <input className="w-52 p-2" type="text" placeholder="cari.." />
      </div>
    </div>
  )
}
function Jumbotron() {
  return (
    <div className=" w-full md:h-96">
      <img className="w-full md:h-96" src="https://media1.tenor.com/m/r3jf1SCoP_QAAAAd/wano-one-piece.gif" />
    </div>
  )
}


function Content({ data, endpoint, setEndpoint, setPage }) {
  function handleClick(data) {
    const slug = data.split('/');
    setEndpoint('detail')
    setPage(slug[3]);
  }

  function AnimeItems() {

    return data.slice(0,10).map((anime, index) => {
      return (
        <div key={index} className="relative w-36 md:w-52 
      bg-white m-1 
      md:m-5 text-center text-sm" onClick={() =>{handleClick(anime.endpoint)}}>
          <img src={anime.thumb} />
          <h1 className="w-full absolute bottom-2 py-2 opacity-80 text-white bg-black z-10">{anime.title}</h1>
        </div>
      )
    })
  }

  function AnimeDetails() {
    console.log(data);
    return (
      <div className="text-white">
        {/* <p>{data.anime_detail.title}</p>
         <img src={data.anime_detail.thumb} /> */}
        {/* <ul>
          {data.anime_detail.detail.map((list) => {
            <li>hallo {list}</li>
          })} 
        </ul> */}
      </div>
    )
  }
  if (endpoint === 'completed' || endpoint === 'ongoing') {
    return (
      <AnimeItems />
    )
  } if (endpoint === 'detail') {
    return (
      <AnimeDetails />
    )
  }
}


function Paggination({ setPage }) {
  return (
    <div className="w-full">
      <ul className="flex justify-center mx-auto my-10">
        <li onClick={() => {
          setPage(1)
        }} className="bg-blue-500 text-white px-5 mx-5">1</li>
        <li onClick={() => {
          setPage(2)
        }} className="bg-blue-500 text-white px-5 mx-5">2</li>
        <li onClick={() => {
          setPage(3)
        }} className="bg-blue-500 text-white px-5 mx-5">3</li>
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <div className="p-5 bg-black text-white w-full text-center">
      <p>&copy;Copyright by Surya Ahmad Afandi</p>
    </div>
  )
}