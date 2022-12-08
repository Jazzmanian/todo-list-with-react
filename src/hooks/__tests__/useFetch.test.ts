import { useFetch } from './../useFetch';
import { renderHook } from '@testing-library/react-hooks';
import { getTasks } from '../../api';

jest.mock('../../api/index');
describe('useFetch test', () => {
  it('should fetch tasks', () => {
    (getTasks as jest.Mock).mockResolvedValue('');
    renderHook(() => useFetch());
    expect(getTasks).toBeCalled();
  });
});
