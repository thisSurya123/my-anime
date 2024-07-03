'use client'

import { useEffect, useState } from "react";
import { axiosInstace } from "./lib/axios";

export default function Home() {

  const [animes, setAnimes] = useState([]);
  const [endpoint, setEndpoint] = useState('ongoing');
  const [page, setPage] = useState('1');

  //request data ke api
  const response = async () => {
    try {

      const animeResponse = await axiosInstace.get(`${endpoint}/${page}`);
      if (endpoint === 'ongoing') {
        setAnimes(animeResponse.data.ongoing);
      } if (endpoint === "completed") {
        setAnimes(animeResponse.data.completed);
      } if (endpoint === "detail") {
        setAnimes(animeResponse.data.anime_detail);
      } if (endpoint === "search") {
        setAnimes(animeResponse.data.search)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(animes)
  useEffect(() => {
    response()
  }, [endpoint, page])




  //bagian home
  return (
    <div className="bg-gray-900 flex flex-wrap md:w-5/6 md:mx-auto justify-center">
      <Navbar setEndpoint={setEndpoint} setPage={setPage} />
      <Jumbotron />
      <h2 className="w-full text-white">{`https://otakudesu-anime-api.vercel.app/api/v1/${endpoint}/${page}`}</h2>
      <h2 className="w-full text-xl text-center bg-blue-900  text-white py-4 font-black">{endpoint}</h2>
      <Content data={animes} endpoint={endpoint} setEndpoint={setEndpoint} setPage={setPage} />
      <Paggination setPage={setPage} />
      <Footer />
    </div>
  )


}

function Navbar({ setEndpoint, setPage }) {
  function handleClick(changeEndpoint, changePage) {
    setEndpoint(changeEndpoint)
    setPage(changePage)
  }
  return (
    <div className="flex justify-between bg-black p-5 w-full">
      <h1 className="text-white">My Anime</h1>
      <div className="flex items-center">
        <ul className="text-white flex mr-5">
          <li className="mx-2" onClick={() => {
            handleClick('ongoing', '1')
          }}>Ongoing</li>
          <li className="mx-2" onClick={() => {
            handleClick('completed', '1');
          }}>Completed</li>
        </ul>
        <input className="w-52 p-2" type="text"
          placeholder="cari.." onChange={(e) => { handleClick('search', e.target.value) }} />
      </div>
    </div>
  )
}
function Jumbotron() {
  return (
    <div className="relative w-full md:h-96">
      <img className="w-full md:h-96" src="https://media1.tenor.com/m/8ufvqab7BnwAAAAd/demon-slayer-kimetsu-no-yaiba.gif" />
      <div className="absolute bottom-4 w-full text-center">
        <input className="mx-5" type='radio' />
        <input className="mx-5" type='radio' />
        <input className="mx-5" type='radio' />
      </div>
    </div>
  )
}


function Content({ data, endpoint, setEndpoint, setPage }) {



  function handleClick(animeUrl) {
    const slug = animeUrl.split('/');
    setEndpoint('detail')
    setPage(slug[3]);
  }

  if (endpoint === ('ongoing') || endpoint === ('completed')) {

    return data.map((anime, index) => {
      return (
        <div key={index} className="relative w-36 md:w-52 
      bg-white m-1 
      md:m-5 text-center text-sm" onClick={() => { handleClick(anime.endpoint) }}>
          <img src={anime.thumb} />
          <p className="absolute opacity-80 top-0 bg-black text-white p-1">{anime.total_episode}</p>
          <p className="absolute opacity-80 top-8 bg-black text-white p-1">{anime.updated_on}</p>
          {endpoint === 'completed' &&
            <p className="absolute opacity-80 bottom-20 right-0 bg-blue-500 text-white p-1">&#9733;{anime.score}</p>
          }
          {endpoint === 'ongoing' &&
            <p className="absolute opacity-80 bottom-20 right-0 bg-blue-500 text-white p-1">&#9733;{anime.updated_day}</p>
          }
          <h1 className="w-full absolute bottom-0 py-2 opacity-80 text-white bg-black z-10">{anime.title}</h1>
        </div>
      )
    })
  }

  if (endpoint === 'detail') {
    return (
      <div className="text-white flex">

        <div className="">
          <h1>{data.title}</h1>
          <img src={data.thumb} />
        </div>
        <ul>
          {data.detail.map((detail) =>{
            return(
              <li>{detail}</li>
            )
          })}
        </ul>
      </div>
    )
  }

  if (endpoint === 'search') {
    if(data == ['']){
      return(
        <h1>Anime Gada Bro</h1>
      )
    }
    return data.map((anime, index) => {
      return (
        <div key={index} className="relative w-36 md:w-52 
          bg-white m-1 
          md:m-5 text-center text-sm" onClick={() => { handleClick(anime.endpoint) }}>
          <img src={anime.thumb} />
          <p className="absolute opacity-80 top-0 bg-black text-white p-1">{anime.status}</p>
          <p className="absolute opacity-80 top-8 bg-black text-white p-1">{anime.rating}</p>
          <h1 className="w-full absolute bottom-0 py-2 opacity-80 text-white bg-black z-10">{anime.title}</h1>
        </div>
      );
    })
  }

}


function Paggination({ setPage }) {
  return (
    <div className="w-full">
      <ul className="flex justify-center mx-auto my-10">
        <li onClick={() => {
          setPage(1)
        }} className="bg-blue-500 text-white px-5 mx-5 rounded-full">1</li>
        <li onClick={() => {
          setPage(2)
        }} className="bg-blue-500 text-white px-5 mx-5 rounded-full">2</li>
        <li onClick={() => {
          setPage(3)
        }} className="bg-blue-500 text-white px-5 mx-5 rounded-full">3</li>
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