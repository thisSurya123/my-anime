export default function Navbar({ setEndpoint, setPage }) {
    function handleClick(changeLayout, changePage) {
      setEndpoint(changeLayout)
      setPage(changePage)
    }
    return (
      <div className="flex justify-between bg-black p-5 w-full">
        <h1 className="text-white" onClick={() => {handleClick('ongoing', 1)}}>My Anime</h1>
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