import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { formatTimestamp } from '../zapkin-lib/timestamp'

const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: 'fixed',
  },
  tableRow: {
    '&:last-child > *': {
      borderBottom: 'none',
    },
  },
  relativeTimeCell: {
    width: 120,
  },
  labelCell: {
    width: 120,
    color: theme.palette.text.secondary,
  },
  valueCell: {
    wordWrap: 'break-word',
  },
}))

export const AnnotationTable = ({ annotations }) => {
  const classes = useStyles()
  const { t } = {}

  return (
    <Table size="small" className={classes.table}>
      <TableBody>
        {annotations.map((annotation) => (
          <TableRow
            key={`${annotation.value}-${annotation.timestamp}`}
            className={classes.tableRow}
          >
            <TableCell className={classes.relativeTimeCell}>
              {annotation.relativeTime}
            </TableCell>
            <TableCell>
              <Table size="small" className={classes.table}>
                <TableBody>
                  {[
                    {
                      label: `Start Time`,
                      value: formatTimestamp(annotation.timestamp),
                    },
                    { label: 'Value', value: annotation.value },
                    { label: `Address`, value: annotation.endpoint },
                  ].map(({ label, value }) => (
                    <TableRow key={label} className={classes.tableRow}>
                      <TableCell className={classes.labelCell}>
                        {label}
                      </TableCell>
                      <TableCell className={classes.valueCell}>
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
