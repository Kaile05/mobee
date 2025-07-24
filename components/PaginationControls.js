export default function PaginationControls({ currentPage,setCurrentPage,totalPages }){
  return(
    <div className="flex justify-center items-center">
      <div className="flex justify-evenly items-center gap-x-1.5 min-md:w-[50vw] bg-[#2f2f2f] py-1.5 px-3 rounded-2xl flex-wrap">
        <button
          onClick={()=>setCurrentPage(1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
        >
          First
        </button>

        <button
          onClick={()=>setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
        >
          Previous
        </button>
        
        <p className="max-md:text-sm text-nowrap">Page <span className="text-[#d4aa7d]">{currentPage}</span> of <span className="text-[#d4aa7d]">{totalPages}</span></p>

        <button
          onClick={()=>setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
        >
          Next
        </button>
        <button
          onClick={()=>setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 max-md:text-sm text-md hover:text-[#d4aa7d] cursor-pointer"
        >
          Last
        </button>
      </div>
    </div>
  )
}