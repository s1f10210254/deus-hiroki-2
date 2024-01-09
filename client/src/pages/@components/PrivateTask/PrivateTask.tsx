import type { Task } from '$/api/@types';
import { useState, type ChangeEvent } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import styles from './PrivateTask.module.css';

export const PrivateTask = (props: { task: Task; fetchTasks: () => Promise<void> }) => {
  const { task } = props;
  const [editingTaskId, setEditingTaskId] = useState<string>();
  const [editingLabel, setEditingLabel] = useState('');
  const isEditing = editingTaskId === task.id;

  const editLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingLabel(e.target.value);
  };
  const toggleDone = async () => {
    await apiClient.private.tasks
      ._taskId(task.id)
      .patch({ body: { isComplete: !task.isComplete, title: task.title } })
      .catch(returnNull);
    await props.fetchTasks();
  };
  const deleteTask = async () => {
    await apiClient.private.tasks._taskId(task.id).delete().catch(returnNull);
    await props.fetchTasks();
  };
  const updateTaskLabel = async () => {
    await apiClient.private.tasks
      ._taskId(task.id)
      .patch({ body: { isComplete: task.isComplete, title: editingLabel } })
      .catch(returnNull);
    setEditingTaskId(undefined);
    setEditingLabel('');
    await props.fetchTasks();
  };
  const startEditTask = () => {
    setEditingTaskId(task.id);
    setEditingLabel(task.title);
  };

  return (
    <label>
      <div className={styles.editGroup}>
        <input type="checkbox" checked={task.isComplete} onChange={toggleDone} />
        {isEditing ? (
          <input
            type="text"
            value={editingLabel}
            className={styles.labelInput}
            onChange={editLabel}
          />
        ) : (
          <span>{task.title}</span>
        )}
      </div>
      <div className={styles.btnGroup}>
        <input type="button" value="DELETE" className={styles.btn} onClick={deleteTask} />
        {isEditing ? (
          <input type="button" value="SAVE" className={styles.btn} onClick={updateTaskLabel} />
        ) : (
          <input type="button" value="EDIT" className={styles.btn} onClick={startEditTask} />
        )}
      </div>
    </label>
  );
};
