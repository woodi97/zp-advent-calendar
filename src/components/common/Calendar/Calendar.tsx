import React, { FC, useState } from 'react'
import { DayPickerSingleDateController, ModifiersShape } from 'react-dates'
import type { Moment } from 'moment'
import useWindowSize from '@src/hooks/useWindowSize'
import { throttle } from 'lodash-es'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import './react_dates_overrides.scss'

// react dates
export default React.PureComponent
export const pureComponentAvailable = true

interface CalendarShape {
  initialVisibleMonth: () => Moment
  isOutsideRange?: (day: Moment) => boolean
  isDayHighlighted?: (day: Moment) => boolean
  renderDayContents?: (day: Moment, modifiers: ModifiersShape) => React.ReactNode
  renderWeekHeaderElement?: (day: string) => React.ReactNode
  renderCalendarInfo?: () => React.ReactNode
}

export const Calendar: FC<CalendarShape> = (props) => {
  const { width } = useWindowSize()
  const [Inputs, setInputs] = useState<{
    focused: boolean
    date: Moment | null
  }>({
    focused: true,
    date: null,
  })

  const daySize = throttle(() => {
    if (!width || width > 768) return 120
    else if (width > 480) return 70
    else return 45
  }, 100)

  return (
    <DayPickerSingleDateController
      {...props}
      transitionDuration={300}
      daySize={daySize()}
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      focused={Inputs.focused}
      date={Inputs.date}
      onDateChange={(date) => {
        setInputs((prev) => ({ ...prev, date }))
      }}
      onFocusChange={({ focused }) => {
        setInputs({ ...Inputs, focused })
      }}
    />
  )
}
