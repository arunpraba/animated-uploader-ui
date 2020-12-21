import { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { FcVideoFile, FcAudioFile, FcUpload } from 'react-icons/fc'
import { IconWrapper } from './IconWrapper'

const IconMapper = {
  VIDEO: FcVideoFile,
  AUDIO: FcAudioFile,
}

export const Loader = ({ answer, index }) => {
  const { uploaded, stage, status } = answer
  const Icon = IconMapper[stage]

  const [percentage, setPercentage] = useState(0)
  const [tracker, setTracker] = useState(0)
  const [variant, setVariant] = useState('SUCCESS')
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    let timerId
    if (isStarted) {
      if (percentage < 100) {
        timerId = setInterval(() => {
          setPercentage((prev) => prev + 2)
          setTracker((prev) => prev + 2)
        }, 50)
      } else {
        clearInterval(timerId)
      }
    }

    return () => {
      clearInterval(timerId)
    }
  }, [percentage, isStarted])

  useEffect(() => {
    if (percentage === 100) {
      setTimeout(() => {
        setTracker(uploaded)
        setVariant(status)
      }, 1000)
    }
  }, [percentage, uploaded, status])

  useEffect(() => {
    const timeOut = 1000 + index * 200
    const timeOutID = setTimeout(() => {
      setIsStarted(true)
    }, timeOut)

    return () => {
      clearTimeout(timeOutID)
    }
  }, [index])

  return (
    <div className="d-flex align-items-center mt-4">
      <IconWrapper>
        <Icon size={24} />
      </IconWrapper>
      <ProgressBar
        variant={variant === 'ERROR' ? 'danger' : 'success'}
        now={tracker}
        className="mx-3"
      />
      {variant === 'danger' && (
        <IconWrapper>
          <FcUpload size={24} />
        </IconWrapper>
      )}
    </div>
  )
}
