import React from 'react';
import { Pagination as PaginationReact, PaginationItem, PaginationLink } from 'reactstrap'

export const Pagination = (props) => {
  const handlePageChange = () => {

  }
  
  const pageNumbers = [1, 2, 3, 4, 5, 6]

  return (
    <PaginationReact className="mt-3" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => {}} 
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => {}}
        />
      </PaginationItem>
      {pageNumbers.map((n: number, i: number) => (
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => {}}
          >
            {n}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => {}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => {}}
        />
      </PaginationItem>
    </PaginationReact>
  )
}

