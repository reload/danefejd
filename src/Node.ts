export default class Node {
  private _name: string
  private _type: number
  private _id: string
  private _edges: Node[] = []
  
  constructor (name: string, type?: number, id?: string) {
    this._name = name
    this._type = type || NodeType.LAND
    this._id = id || name.substring(0, 3).toLowerCase()
  }

  addEdge (node: Node) {
    this._edges.push(node)
  }

  get edges () : Node[] {
    return this._edges
  }

  get type () : number {
    return this._type
  }

  get id () : string {
    return this._id
  }
}

export enum NodeType {
  LAND,
  SEA,
  COASTAL
}