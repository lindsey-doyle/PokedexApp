export const capitalizeFirstLetter = (
  field: { name: string | null },
): string => (field && field.name
  ? field.name.charAt(0).toUpperCase() + field.name.slice(1) : '')

export const removeHyphenAndCapitalize = (
  field: { name: string | null } | null,
): string => {
  if (field && field.name) {
    const words = field.name.split('-')
    const capitalizedWords = words.map((word) => capitalizeFirstLetter({ name: word }))
    return capitalizedWords.join(' ')
  }
  return ''
}
