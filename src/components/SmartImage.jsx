import { useState } from 'react'

/**
 * Wraps <img> with the attributes every image on the site was missing:
 * intrinsic dimensions (so the box is reserved before load), lazy loading
 * below the fold, async decoding, and a graceful failure. On error the
 * element is dropped so the wrapper's own background shows through
 * instead of a broken-image icon.
 */
export default function SmartImage({
  src,
  alt = '',
  width = 1200,
  height = 900,
  priority = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
