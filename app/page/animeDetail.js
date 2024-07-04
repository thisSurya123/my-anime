export default function AnimeDetail({animesDetail, isLoading}){
  if(animesDetail.length <= 0){
    return(
      <h1>Sedang Loading</h1>
    )
  }

  console.log(animesDetail);
    return(
      <>
         <img className="h-96 mr-10" src={animesDetail.anime_detail.thumb} />
          <ul className="w-96">
            {animesDetail.anime_detail.detail.map((detail) => {
              return(
                <li>{detail}</li>
              )
            })}
          </ul>
          <h1 className="bg-black text-white text-xl p-3 w-full mx-10">{animesDetail.anime_detail.title}</h1>
          <div className="bg-red-900 w-5/6 h-96 overflow-y-scroll mt-5">
            {animesDetail.episode_list.map((episode) => {
              return(
                <a href={episode.episode_endpoint} target="__blank">
                <ul className="text-blue-900 bg-black p-2 border my-2">
                  <li>{episode.episode_title}</li>
                  <li>{episode.episode_date}</li>
                </ul>
                </a>
              )
            })}
          </div>
      </>
    )
  }
  