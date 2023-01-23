import { useContext } from 'react';
import ApiContext from './apiContext';

const useApi = () => useContext(ApiContext);

export default useApi;
