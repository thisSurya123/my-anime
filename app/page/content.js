export default function Content({ data, endpoint, setPage, setEndpoint, setLoading }){

  function handleClick(animeUrl) {
    const slug = animeUrl.split('/');
    setEndpoint('detail')
    setPage(slug[3]);
    setLoading(true);
  }
  // if(data.length <= 0){
  //   return (
  //     <h1>Anime Not Found!</h1>
  //   );
  // }


  if(data.length <=0 ){
    return(
      <h1>Gada cuy</h1>
    )
  }
  return data.slice(0, 15).map((anime, index) => {
    return (
      <div key={index} className="relative w-36 md:w-52 
      bg-white m-1 
      md:m-5 text-center text-sm" onClick={() => { handleClick(anime.endpoint) }}>

        <img src={anime.thumb} />
        <p className="absolute opacity-80 top-0 bg-black text-white p-1">{anime.total_episode}</p>
        <p className="absolute opacity-80 top-8 bg-black text-white p-1">{anime.updated_on}</p>
        {endpoint === 'completed' || anime.status === 'completed' &&
          <p className="absolute opacity-80 bottom-20 right-0 bg-blue-500 text-white p-1">&#9733;{anime.score}</p>
        }
        {endpoint === 'ongoing' || anime.status === 'completed' &&
          <p className="absolute opacity-80 bottom-20 right-0 bg-blue-500 text-white p-1">&#9733;{anime.updated_day}</p>
        }
        <h1 className="w-full absolute bottom-0 py-2 opacity-80 text-white bg-black z-10">{anime.title}</h1>
      </div>
    )
  })
}