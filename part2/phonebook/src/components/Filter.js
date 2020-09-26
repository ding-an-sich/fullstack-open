import React from 'react'

const Filter = (props) => {
    return (
      <div>
        search: <input value={props.searchFilter} onChange={props.handleSearchFilter}/>
      </div>
    )
}

export default Filter