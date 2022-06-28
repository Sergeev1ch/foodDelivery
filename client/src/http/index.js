import axios from 'axios';

const $host = axios.create({
  baseURL: 'https://testtasket.herokuapp.com',
});

export { $host };
