import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useMemo } from 'react'
import { formatDuration } from '../zapkin-lib/timestamp'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 16,
    position: 'relative',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tick: {
    height: 16,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.text.secondary,
    bottom: 0,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '&:not(:last-child)': {
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
}))

const numOfTickMarkers = 3

export const TickMarkers = ({ minTimestamp, maxTimestamp }) => {
  const classes = useStyles()

  const ticks = useMemo(() => {
    const result = []
    for (let i = 0; i <= numOfTickMarkers; i += 1) {
      const timestamp = formatDuration(
        ((maxTimestamp - minTimestamp) / numOfTickMarkers) * i + minTimestamp,
      )
      let left
      let right
      if (i === numOfTickMarkers) {
        right = '0%'
      } else {
        left = `${(i / numOfTickMarkers) * 100}%`
      }

      result.push(
        <Box
          key={i}
          component="span"
          className={classes.tick}
          style={{ left, right }}
        >
          {timestamp}
        </Box>,
      )
    }
    return result
  }, [classes.tick, maxTimestamp, minTimestamp])

  return <Box className={classes.root}>{ticks}</Box>
}
