import axios from 'axios';

export const driversLimit = 20;
export const resultsLimit = 20;

export function fetchDrivers(offset) {
  return axios
    .get(
      `http://ergast.com/api/f1/drivers.json?limit=${driversLimit}&offset=${offset}`,
    )
    .then((response) => response)
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        return error.request;
      }
    });
}

export function fetchResults(driver, offset) {
  return axios
    .get(
      `http://ergast.com/api/f1/drivers/${driver}/driverStandings.json?limit=${resultsLimit}&offset=${offset}`,
    )
    .then((response) => response.data.MRData.StandingsTable.StandingsLists)
    .catch(() => []);
}
