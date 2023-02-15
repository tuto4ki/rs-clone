import { serverAdress } from '../../game/constGame';
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
  return fetch(`${serverAdress}/user?username=${username}&password=${password}`, {
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

  // все филды обязательны!
  // await addScore('asdfa', 2, 123, '23:13:12').then((res) => {
  // switch (res.status) {
  //   case responseStatus.error:
  //     console.log('error');
  //     break;
  //   case responseStatus.created:
  //     console.log('created');
  //     break;
  // }
  // });
};

export const getScore = (query: ISortQuery): Promise<OveralScore> => {
  let queryString = '';
  const symbol = ['?', '&'];

  Object.keys(query).forEach((element, index) => {
    if (index != 0) {
      queryString += symbol[1];
    } else {
      queryString += symbol[0];
    }
    const el = element as keyof ISortQuery;
    queryString += `${el}=${query[el]}`;
  });

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
