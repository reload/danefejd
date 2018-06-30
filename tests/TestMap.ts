import Graph from '../src/Graph'
import Node from '../src/Node'

export default class TestMap extends Graph {
  private _graph: Node[] = []

  public get graph () : Node[] {
    return this._graph
  }

  public setGraph (input: any) {
    if (input.nodes) {
      for (let node of input.nodes) {
        this._graph.push(node)
      }
    }

    if (input.edges) {
      for (let edge of input.edges) {
        const from = this._graph.indexOf(edge.from)
        const to = this._graph.indexOf(edge.to)
        this._graph[from].addEdge(this._graph[to])
      }
    }
  }
}