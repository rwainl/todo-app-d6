import React from "react";

function FilterButton({ setFilter }) {
  return (
    <>
      <div className="max-w-xl mx-auto bg-gray-400 text-center rounded-xl">
        <p className="text-2xl font-bold py-4 text-center">Filter</p>
        <button
          onClick={() => setFilter("Semua")}
          className="bg-white rounded-lg border py-1 px-2 mx-2 mb-4 duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("Selesai")}
          className="bg-white rounded-lg border py-1 px-2 mx-2 mb-4 duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Selesai
        </button>
        <button
          onClick={() => setFilter("Belum Selesai")}
          className="bg-white rounded-lg border py-1 px-2 mx-2 mb-4 duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          Belum Selesai
        </button>
      </div>
    </>
  );
}

export default FilterButton;
