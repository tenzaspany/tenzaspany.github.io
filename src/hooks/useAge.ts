export function useAge() {
  const today = new Date()
  const birthDate = new Date(2006, 10, 22)
  let age = today.getFullYear() - birthDate.getFullYear()
  const birthdayHasPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!birthdayHasPassed) age -= 1
  return age
}
