import type { Task } from '$/api/@types';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { ElapsedTime } from 'src/components/ElapsedTime/ElapsedTime';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<Task[]>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const inputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const inputDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const inputDueDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.private.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    await apiClient.private.tasks
      .$post({ body: { title, description, dueDate, userId: user?.id ?? '' } })
      .catch(returnNull);
    setTitle('');
    setDescription('');
    setDueDate('');
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  if (!tasks) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <ul className={styles.tasks}>
          {user && (
            <li className={styles.createTask}>
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={inputTitle}
                className={styles.createTaskInput}
              />
              <input
                type="text"
                placeholder="Task description"
                value={description}
                onChange={inputDescription}
                className={styles.createTaskInput}
              />
              <input
                type="date"
                value={dueDate}
                onChange={inputDueDate}
                className={styles.createTaskInput}
              />
              <button onClick={createTask} className={styles.postBtn}>
                Create Task
              </button>
            </li>
          )}
          {tasks.map((task) => (
            <div key={task.id}>
              <li className={styles.taskHeader}>
                <div className={styles.authorName}>{task.title}</div>
                <ElapsedTime createdTime={new Date(task.createdAt).getTime()} />
              </li>
              <li className={styles.label}>
                <span>{task.description}</span>
                {task.isComplete && <span>(Completed)</span>}
                {task.dueDate && <span>Due: {task.dueDate}</span>}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
