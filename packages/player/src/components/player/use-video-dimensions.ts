import { useState, useEffect } from 'react'

/**
 * useVideoDimensions
 * @param {number} aspectRatio - Video en-boy oranı (varsayılan: 16/9).
 *                               Aspect ratio, width/height olarak verilmelidir.
 * @returns {Object} { videoHeight, letterboxMargin }
 *
 * videoHeight: Tarayıcı genişliğine göre hesaplanan video yüksekliği.
 * letterboxMargin: Videonun container (viewport) ile arasındaki boşluk (üst ve alt boşluklardan biri).
 */
export function useVideoDimensions(aspectRatio = 16 / 9) {
  const [dimensions, setDimensions] = useState({
    videoHeight: 0,
    letterboxMargin: 0,
  })

  useEffect(() => {
    function updateDimensions() {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Videonun tam genişlikte gösterildiğini varsayıyoruz.
      // Video yüksekliği = genişlik / (aspectRatio)
      const videoHeight = viewportWidth / aspectRatio

      // Eğer video yüksekliği viewport yüksekliğinden küçükse,
      // container içinde üst ve alt boşluk (letterbox) oluşur.
      const letterboxMargin = viewportHeight > videoHeight ? (viewportHeight - videoHeight) / 2 : 0

      setDimensions({ videoHeight, letterboxMargin })
    }

    // İlk hesaplama
    updateDimensions()
    // Tarayıcı yeniden boyutlandığında güncelle
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [aspectRatio])

  return dimensions
}
