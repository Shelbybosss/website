import { Box, Button } from '@mui/material'
import { makeStyles, useTheme } from '@mui/styles'
import React, { useCallback, useMemo, useRef } from 'react'
import { MiniTimelineOverlay } from './MiniTimelineOverlay'
import { TimeRangeSelector } from './TimeRangeSelector'
import { MiniTimelineRow } from './MiniTimelineRow'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 50,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    // Show the reset button only when hovering.
    '& > button': {
      display: 'none',
    },
    '&:hover > button': {
      display: 'inline',
    },
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  resetButton: {
    position: 'absolute !important',
    right: '10px !important',
    top: '6px !important',
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
}))

const numOfTickMarkers = 3

export const MiniTimeline = ({
  spanRows,
  minTimestamp,
  maxTimestamp,
  selectedMinTimestamp,
  selectedMaxTimestamp,
  setSelectedMinTimestamp,
  setSelectedMaxTimestamp,
  services,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const rootEl = useRef(null)

  const ticks = useMemo(() => {
    const result = []
    for (let i = 1; i < numOfTickMarkers; i += 1) {
      const x = `${(i / numOfTickMarkers) * 100}%`
      result.push(
        <line
          key={i}
          x1={x}
          y1="0"
          x2={x}
          y2="100%"
          stroke={theme.palette.divider}
          strokeWidth={1}
        />,
      )
    }
    return result
  }, [theme.palette.divider])

  const handleResetButtonClick = useCallback(
    (e) => {
      e.stopPropagation()
      setSelectedMinTimestamp(minTimestamp)
      setSelectedMaxTimestamp(maxTimestamp)
    },
    [
      maxTimestamp,
      minTimestamp,
      setSelectedMaxTimestamp,
      setSelectedMinTimestamp,
    ],
  )

  return (
    <Box className={classes.root}>
      {(selectedMaxTimestamp !== maxTimestamp ||
        selectedMinTimestamp !== minTimestamp) && (
        <Button
          variant="outlined"
          size="small"
          className={classes.resetButton}
          onClick={handleResetButtonClick}
        >
          Reset
        </Button>
      )}
      <svg className={classes.svg} ref={rootEl}>
        <g>
          {spanRows.map((spanRow, i) => (
            <MiniTimelineRow
              key={spanRow.spanId}
              top={(100 / spanRows.length) * i}
              spanRow={spanRow}
              minTimestamp={minTimestamp}
              maxTimestamp={maxTimestamp}
              services={services}
            />
          ))}
        </g>
        <g>{ticks}</g>
        <MiniTimelineOverlay
          minTimestamp={minTimestamp}
          maxTimestamp={maxTimestamp}
          setSelectedMinTimestamp={setSelectedMinTimestamp}
          setSelectedMaxTimestamp={setSelectedMaxTimestamp}
        />
        <TimeRangeSelector
          rootEl={rootEl}
          minTimestamp={minTimestamp}
          maxTimestamp={maxTimestamp}
          selectedMinTimestamp={selectedMinTimestamp}
          selectedMaxTimestamp={selectedMaxTimestamp}
          setSelectedMinTimestamp={setSelectedMinTimestamp}
          setSelectedMaxTimestamp={setSelectedMaxTimestamp}
        />
      </svg>
    </Box>
  )
}
