export interface DependencyEdge {
  sourceTaskId: string; // The blocking task
  targetTaskId: string; // The blocked task
}

export interface CycleCheckResult {
  hasCycle: boolean;
  cyclePath?: string[];
  error?: string;
}

/**
 * Validates whether adding a dependency edge (sourceTaskId -> targetTaskId)
 * would create a circular dependency (deadlock) in the project DAG.
 *
 * An edge (source -> target) means "source blocks target".
 * A cycle would be created if target can already reach source through existing edges.
 */
export function validateDagDependency(
  existingEdges: DependencyEdge[],
  newEdge: DependencyEdge
): CycleCheckResult {
  const { sourceTaskId, targetTaskId } = newEdge;

  // Self-dependency check
  if (sourceTaskId === targetTaskId) {
    return {
      hasCycle: true,
      cyclePath: [sourceTaskId, targetTaskId],
      error: `Circular dependency detected: Task cannot depend on itself (${sourceTaskId}).`,
    };
  }

  // Duplicate edge check
  const duplicate = existingEdges.some(
    (e) => e.sourceTaskId === sourceTaskId && e.targetTaskId === targetTaskId
  );
  if (duplicate) {
    return {
      hasCycle: false,
    };
  }

  // Build adjacency list: node -> array of blocked nodes
  const adjacency = new Map<string, string[]>();
  for (const edge of existingEdges) {
    if (!adjacency.has(edge.sourceTaskId)) {
      adjacency.set(edge.sourceTaskId, []);
    }
    adjacency.get(edge.sourceTaskId)!.push(edge.targetTaskId);
  }

  // Check if sourceTaskId is reachable starting from targetTaskId using DFS
  const visited = new Set<string>();
  const path: string[] = [];

  function dfs(current: string): boolean {
    visited.add(current);
    path.push(current);

    if (current === sourceTaskId) {
      return true; // Found path from target back to source => CYCLE!
    }

    const neighbors = adjacency.get(current) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      }
    }

    path.pop();
    return false;
  }

  const createsCycle = dfs(targetTaskId);

  if (createsCycle) {
    const fullCycle = [sourceTaskId, ...path];
    return {
      hasCycle: true,
      cyclePath: fullCycle,
      error: `Circular dependency detected: Adding this dependency creates a deadlock cycle: ${fullCycle.join(' ➔ ')}.`,
    };
  }

  return {
    hasCycle: false,
  };
}
