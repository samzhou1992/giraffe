// Libraries
import React, {FC, useContext} from 'react'
import {PaginationContext} from './pagination'

// Components
import {PaginationNav} from './PaginationNav'

// Styles
import styles from './SimpleTableGraph.scss'

const PageControl: FC = () => {
  const {offset, size, total, totalPages, setPage} = useContext(
    PaginationContext
  )
  return (
    <div className={`${styles['visualization--simple-table--paging']}`}>
      {total && size > 0 && (
        <PaginationNav.PaginationNav
          totalPages={totalPages}
          currentPage={Math.min(Math.floor(offset / size) + 1, totalPages)}
          pageRangeOffset={1}
          onChange={setPage}
        />
      )}
    </div>
  )
}

export default PageControl
