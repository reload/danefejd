interface Grouping {
  [key: string]: string
}

export const groupBy = (collection: any[], prop: string) : Grouping => {
  return collection.reduce((coll, item) => {
    coll[item[prop]] = coll[item[prop]] || []
    coll[item[prop]].push(item)
    return coll
  }, {})
}
