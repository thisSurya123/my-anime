export default function Paggination({ setPage }) {
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