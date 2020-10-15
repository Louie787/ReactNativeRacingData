import axios from 'axios';

export const driversLimit = 20;
export const resultsLimit = 20;

export function fetchDrivers(offset) {
  return axios
    .get(
      `http://ergast.com/api/f1/drivers.json?limit=${driversLimit}&offset=${offset}`,
    )
    .then((response) => response.data.MRData.DriverTable.Drivers)
    .catch(() => []);
}

export function fetchResults(driver, offset) {
  return axios
    .get(
      `http://ergast.com/api/f1/drivers/${driver}/driverStandings.json?limit=${resultsLimit}&offset=${offset}`,
    )
    .then((response) => response.data.MRData.StandingsTable.StandingsLists)
    .catch(() => []);
}
