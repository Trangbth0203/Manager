import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const Paginations = () => {

  return (
    <>
      <nav className="mt-4">
        <Pagination className="d-flex justify-content-end" >
          <PaginationItem className=" disabled">
            <PaginationLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              tabindex="-1"
            >
              <i className=" fa fa-angle-left"></i>
              <span className=" sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{ color: '#FFFFFF' }} className=" active">
            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
              2 <span className=" sr-only"></span>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className=" fa fa-angle-right"></i>
              <span className=" sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    </>
  );
}
