/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};
