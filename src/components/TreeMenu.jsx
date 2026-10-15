import { useState } from 'react';

function TreeNode({ node, level, selectedId, expanded, onToggle, onSelect }) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    onSelect({ id: node.id, label: node.label, level });
    if (hasChildren && !isOpen) onToggle(node.id);
  };

  return (
    <li>
      <div
        className={`tree-row ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: 12 + level * 16 + (hasChildren ? 0 : 20) }}
      >
        {hasChildren && (
          <button
            type="button"
            className="tree-toggle"
            aria-label={isOpen ? `Collapse ${node.label}` : `Expand ${node.label}`}
            aria-expanded={isOpen}
            onClick={() => onToggle(node.id)}
          >
            {isOpen ? '−' : '+'}
          </button>
        )}
        <button type="button" className="tree-label" onClick={handleClick}>
          {node.label}
        </button>
      </div>
      {hasChildren && isOpen && (
        <ul className="tree-list">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TreeMenu({ nodes, selectedId, onSelect, defaultExpanded = [] }) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));

  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <aside className="tree-menu" aria-label="Location tree">
      <ul className="tree-list">
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            level={0}
            selectedId={selectedId}
            expanded={expanded}
            onToggle={toggle}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </aside>
  );
}