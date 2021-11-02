export const getMin = (items, attribute) => {
  let min = 100
  items.forEach((item) => {
    let value = item['properties'][attribute]
    if (value < min) {
      min = value
    }
  })

  return min
}

export const getMax = (items, attribute) => {
  let max = 0
  items.forEach((item) => {
    let value = item['properties'][attribute]
    if (value > max) {
      max = value
    }
  })

  return max
}
