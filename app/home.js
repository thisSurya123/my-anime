'use client'
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
            }}>Completed</li>
          </ul>
          <input className="w-52 p-2" type="text" placeholder="cari.." />
        </div>
      </div>
    )
}

export default Navbar;