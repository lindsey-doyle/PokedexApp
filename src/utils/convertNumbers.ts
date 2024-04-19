export const weightToLibra = (weightInKilogram: number): string => {
  const libra = Math.round(weightInKilogram * 22.046) / 10
  return `${libra} lbs`
}

export const heightToFeetAndInches = (heightInDecimeters: number): string => {
  const meters = heightInDecimeters / 10
  const feet = meters * 3.28084
  const feetInt = Math.floor(feet)
  const inches = (feet - feetInt) * 12

  return `${feetInt}'${inches.toFixed(1)}"`
}
