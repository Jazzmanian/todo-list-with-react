import { useFetch } from './../useFetch';
import { renderHook } from '@testing-library/react-hooks';
import { getTasks } from '../../api/api';

jest.mock('../../api/api');
describe('useFetch test', () => {
  it('should fetch tasks', () => {
    (getTasks as jest.Mock).mockResolvedValue('');
    renderHook(() => useFetch('http://localhost:8080/tasks'));
    expect(getTasks).toBeCalled();
  });
});
