import React, { FC } from 'react'
import {
  Pagination as ReactPagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  Input,
} from 'reactstrap'
import classnames from 'classnames'
import styles from '~/styles/components/elements/pagination.module.scss'

const MAX_ITEM = 2
const SELECT_DEFAULT_VALUES = [10, 20, 30, 40, 50]

interface Props {
  isLoading: boolean
  currentPage: number
  totalItems: number
  perPage: number
  onPaginate: (value: number) => void
  onChangeLimit: (value: number) => void
}

const Pagination: FC<Props> = ({
  isLoading,
  currentPage,
  totalItems,
  perPage,
  onPaginate,
  onChangeLimit,
}) => {
  const pageNumbers = []
  const numberPage = Math.ceil(totalItems / perPage)
  let pagePrev = currentPage - 1
  if (pagePrev < 1) {
    pagePrev = 1
  }
  let pageNext = pagePrev + MAX_ITEM
  if (pageNext > numberPage) {
    pageNext = numberPage
    pagePrev = pageNext - MAX_ITEM
  }
  if (pagePrev < 1) {
    pagePrev = 1
  }
  for (let i = pagePrev; i <= pageNext; i++) {
    pageNumbers.push(i)
  }
  if (numberPage - MAX_ITEM > currentPage && !(currentPage === 1 && numberPage === MAX_ITEM * 2)) {
    pageNumbers.push('...')
  }
  if (currentPage + MAX_ITEM <= numberPage && numberPage !== MAX_ITEM + 1) {
    pageNumbers.push(numberPage)
  }
  const onChangeRecord = (e) => {
    const { value } = e.target
    onChangeLimit(value)
  }

  return (
    <div className={styles.paginate}>
      <FormGroup className="mt-1">
        <Input className={styles.arrow}
          type="select"
          name="limit"
          onChange={onChangeRecord}
          disabled={isLoading}
        >
          {SELECT_DEFAULT_VALUES?.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            )
          })}
        </Input>
      </FormGroup>
      <ReactPagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink
            first
            onClick={() => onPaginate(1)}
            className={
              (currentPage === 1 || isLoading || totalItems === 0) &&
              classnames(styles.pointerEventsNone, styles.disableRow)
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={
              (currentPage === 1 || isLoading || totalItems === 0) &&
              classnames(styles.pointerEventsNone, styles.disableRow)
            }
            previous
            onClick={() => onPaginate(currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((n: number | string, i: number) => (
          <PaginationItem key={i}>
            <PaginationLink
              className={classnames(
                currentPage === n
                  ? styles.activePaginate
                  : totalItems === 0
                  ? 'd-none'
                  : '',
                n === '...' ? styles.pointerEventsNone : ''
              )}
              onClick={() => onPaginate(Number(n))}
            >
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            next
            className={
              (currentPage === Number(numberPage) ||
                isLoading ||
                totalItems === 0) &&
              classnames(styles.pointerEventsNone, styles.disableRow)
            }
            onClick={() => onPaginate(currentPage + 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            className={
              (currentPage === Number(numberPage) ||
                isLoading ||
                totalItems === 0) &&
                classnames(styles.pointerEventsNone, styles.disableRow)
            }
            onClick={() => onPaginate(Number(numberPage))}
          />
        </PaginationItem>
      </ReactPagination>
    </div>
  )
}

export default Pagination
