//api.js
// === Boards ===

export const getBoards = async () => {
    const res = await fetch('/api/boards');
    if (!res.ok) throw new Error('Failed to fetch boards');
    return res.json();
  };

export const createBoard = async(title = 'Add title for this panel') => {
    const res = await fetch('/api/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title}) // default title
    });
    if (!res.ok) throw new Error('Failed to add board');
    return res.json()
}

export const updateBoardTitle = async(boardId, newTitle) => {
    const res = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
    });
    if (!res.ok) throw new Error(`Failed to update board ${boardId}`);
    return res.json()
}

export const deleteBoard = async(boardId) => {
    const res = await fetch(`/api/boards/${boardId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete board ${boardId}`);
    return res
}

// === Tasks ===

export const addTask = async(boardId, value) => {

    const res = await fetch(`/api/tasks/${boardId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value })
    });

    if (!res.ok) throw new Error(`Failed to add task to board ${boardId}`);
    return res.json();
}

export const deleteTask = async(boardId, taskId) => {
    const res = await fetch(`/api/tasks/${boardId}/${taskId}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error(`Failed to delete task ${taskId} from board ${boardId}`);
    return res
}

export const moveTask = async(sourceBoardId, taskId, targetBoardId, targetIndex) => {
    const res = await fetch(`/api/tasks/${sourceBoardId}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBoardId, targetIndex })
    });
    if (!res.ok) throw new Error(`Failed to move task ${taskId}`);
    return res
}