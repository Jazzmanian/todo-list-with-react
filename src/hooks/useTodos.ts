import { AxiosResponse } from 'axios';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
import { deleteTask, getTasks, postTasks, putTask } from '../api';
import { ITask } from '../types';

interface ITodos {
  data: ITask[] | undefined;
  addMutation: UseMutationResult<ITask, unknown, string, unknown>;
  deleteMutation: UseMutationResult<
    AxiosResponse<void>,
    unknown,
    number,
    unknown
  >;
  checkMutation: UseMutationResult<
    AxiosResponse<ITask>,
    unknown,
    ITask,
    unknown
  >;
}

export const useTodos = (): ITodos => {
  const queryClient = useQueryClient();
  const { data } = useQuery('todos', getTasks);

  const addMutation = useMutation(postTasks, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
    },
  });
  const deleteMutation = useMutation(deleteTask, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
    },
  });
  const checkMutation = useMutation(putTask, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('todos');
    },
  });

  return { data, addMutation, deleteMutation, checkMutation };
};
