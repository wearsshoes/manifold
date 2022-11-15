import clsx from 'clsx'
import { shortFormatNumber } from 'common/util/format'
import { Tooltip } from '../widgets/tooltip'
import TipJar from 'web/public/custom-components/tipJar'
import { useState } from 'react'
import Coin from 'web/public/custom-components/coin'
import { FormattedMana } from '../mana'

export function TipButton(props: {
  tipAmount: number
  totalTipped: number
  onClick: () => void
  userTipped: boolean
  isCompact?: boolean
  disabled?: boolean
}) {
  const { tipAmount, totalTipped, userTipped, onClick, disabled } = props

  const tipDisplay = shortFormatNumber(Math.ceil(totalTipped / 10))

  const [hover, setHover] = useState(false)

  return (
    <Tooltip
      text={
        disabled ? (
          <>
            Total tips <FormattedMana amount={totalTipped} />
          </>
        ) : (
          <>
            Tip <FormattedMana amount={tipAmount} />
          </>
        )
      }
      placement="bottom"
      noTap
      noFade
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'px-2 py-1 text-xs', //2xs button
          'text-gray-500 transition-transform disabled:cursor-not-allowed',
          !disabled ? 'hover:text-gray-600' : ''
        )}
        onMouseOver={() => {
          if (!disabled) {
            setHover(true)
          }
        }}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative m-px">
          <div
            className={clsx(
              'absolute transition-all',
              hover ? 'left-[6px] -top-[9px]' : 'left-[8px] -top-[10px]'
            )}
          >
            <Coin
              size={10}
              color={
                hover && !userTipped
                  ? '#66667C'
                  : userTipped
                  ? '#4f46e5'
                  : '#9191a7'
              }
              strokeWidth={2}
            />
          </div>
          <TipJar
            size={18}
            color={
              hover && !disabled && !userTipped
                ? '#66667C'
                : userTipped
                ? '#4f46e5'
                : '#9191a7'
            }
          />
          <div
            className={clsx(
              userTipped && 'text-indigo-600',
              'absolute top-0.5 text-[0.5rem]',
              tipDisplay.length === 1
                ? 'left-[7px]'
                : tipDisplay.length === 2
                ? 'left-[4.5px]'
                : tipDisplay.length > 2
                ? 'left-[4px] top-[2.5px] text-[0.35rem]'
                : ''
            )}
          >
            {totalTipped > 0 ? tipDisplay : ''}
          </div>
        </div>
      </button>
    </Tooltip>
  )
}
