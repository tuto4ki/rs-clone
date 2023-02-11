import { serverAdress } from '../../constGame';
import { ISortQuery, OveralScore } from '../types';

export const register = (username: string, password: string, avatar = 1) => {
  return fetch(`${serverAdress}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      avadarId: avatar,
    }),
  });
};

export const login = (username: string, password: string) => {
  return fetch(`${serverAdress}/login?username=${username}&password=${password}`, {
    method: 'GET',
  });
};

export const addScore = (username: string, level: number, score: number, time: string) => {
  // time shoudl be string?
  return fetch(`${serverAdress}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      level: level,
      score: score,
      time: time,
    }),
  });

  // все филы одязательны!
  // await addScore('asdfa', 2, 123, '23:13:12').then((res) => {
  //   if (res.status === responseStatus.error) console.log('error');
  //   if (res.status === responseStatus.created) console.log('created');
  // });
};

export const getScore = (query: ISortQuery): Promise<OveralScore> => {
  let queryString = '';
  const symbol = ['?', '&'];

  if (query.sort) {
    queryString += queryString.length > 1 ? symbol[1] : symbol[0];
    queryString += `sort=${query.sort}`;
  }
  if (query.order) {
    queryString += queryString.length > 1 ? symbol[1] : symbol[0];
    queryString += `order=${query.order}`;
  }
  if (query.level) {
    queryString += queryString.length > 1 ? symbol[1] : symbol[0];
    queryString += `level=${query.level}`;
  }
  if (query.page) {
    queryString += queryString.length > 1 ? symbol[1] : symbol[0];
    queryString += `page=${query.page}`;
  }
  if (query.limit) {
    queryString += queryString.length > 1 ? symbol[1] : symbol[0];
    queryString += `limit=${query.limit}`;
  }

  return fetch(`${serverAdress}/score${queryString}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });

  // sort + order должны идти в свзяке, филды опциональны все
  // await getScore({ sort: 'score', order: 'ASC', level: 1, page: 1, limit: 2 }).then((res) => {
  //   console.log(res);
  // });
};
