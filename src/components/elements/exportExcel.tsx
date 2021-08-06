import React from 'react'
import Button from 'react-bootstrap/Button'
import { IconExport } from '~/src/components/elements'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import styles from '~/styles/components/elements/export.module.scss'

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <Button
      className={styles.export}
      variant="warning"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      <span className={styles.iconExport}>
        <IconExport />
      </span>
      EXPORT
    </Button>
  )
}
