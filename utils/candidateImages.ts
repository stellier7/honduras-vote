// Candidate image mapping utility
export const getCandidateImage = (candidateName: string): string => {
  const normalizedName = candidateName.toLowerCase().trim()
  
  if (normalizedName.includes('nasry') || normalizedName.includes('asfura')) {
    return '/images/NASRY_ASFURA.jpg'
  }
  
  if (normalizedName.includes('rixi') || normalizedName.includes('moncada')) {
    return '/images/RIXI_MONCADA.jpg'
  }
  
  // Default fallback image
  return '/assets/images/question.jpeg'
}

export const getAvailableCandidates = () => [
  { name: 'Nasry Asfura', image: '/images/NASRY_ASFURA.jpg' },
  { name: 'Rixi Moncada', image: '/images/RIXI_MONCADA.jpg' }
] 