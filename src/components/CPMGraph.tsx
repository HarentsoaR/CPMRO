import React, { useState } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import dagre from 'dagre';

interface CPMGraphProps {
 nodes: any[];
 edges: any[];
}

const CPMGraph: React.FC<CPMGraphProps> = ({ nodes, edges }) => {
 const [elements, setElements] = useState([...nodes, ...edges]);

 // Layouting logic using dagre
 const dagreGraph = new dagre.graphlib.Graph();
 dagreGraph.setGraph({ rankdir: 'TB' }); // Set direction to top-bottom
 dagreGraph.setDefaultEdgeLabel(() => ({}));

 nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 100, height: 50 }); // Adjust size as needed
 });

 edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
 });

 dagre.layout(dagreGraph);

 const layoutedElements = nodes.map((node) => {
    const layoutedNode = dagreGraph.node(node.id);
    node.position = { x: layoutedNode.x - 50, y: layoutedNode.y - 25 }; // Adjust positioning as needed
    return node;
 });

 setElements([...layoutedElements, ...edges]);

 return (
    <div>
      <svg style={{ width: 0, height: 0 }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L9,3.5 z" fill="#000" />
          </marker>
        </defs>
      </svg>
      <ReactFlow
        elements={elements}
        onElementsRemove={(elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els))}
        onConnect={(params) => setElements((els) => addEdge(params, els))}
        snapToGrid={true}
        snapGrid={[15, 15]}
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
 );
};

export default CPMGraph;
