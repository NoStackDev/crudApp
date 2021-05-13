const regexFromString = (str, flag) => {
  return new RegExp(str, flag)
}

const parseQueryObj = (queryObj) => {
  let newQueryObj = {}
  for (let queryKey in queryObj) {
    newQueryObj[queryKey] = regexFromString(queryObj[queryKey], 'i')
  }
  return newQueryObj
}


module.exports = { regexFromString, parseQueryObj }

