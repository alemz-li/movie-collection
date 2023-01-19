import { useState } from 'react'
import leftChevron from '../assets/left.svg'
import rightChevron from '../assets/right.svg'

const usePagination = () => {
  const [page, setPage] = useState(1)
  
  const createPages = (pageCount) => {
    const content = []
    for (let i = 1; i <= pageCount; i++) {
      content.push(
        <button className={`pagination__page${page == i ? ' active' : ''}`}
          key={i}
          onClick={() => {
            setPage(i)
          }}
        >
          {i}
        </button>
      )
    }
    return content
  }
  const createPagination = (pageInfo) => {
    return (
      <div className="pagination">
        {pageInfo.hasPreviousPage && (
          <button className='pagination__previous' onClick={() => setPage((prev) => prev - 1)}><img src={leftChevron} alt="Previous Page"/></button>
        )}
        {createPages(pageInfo.pages)}
        {pageInfo.hasNextPage && (
          <button className='pagination__next' onClick={() => setPage((prev) => prev + 1)}><img src={rightChevron} alt="Next Page" /></button>
        )}
      </div>
    )
  }

  return { createPagination, page }
}

export default usePagination
