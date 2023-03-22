
export const getGithubFollowers = (user, page = 1, perPage = 100) =>  
  fetch(`https://api.github.com/users/${user}/followers?page=${page}&per_page=${perPage}`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then(response => response.message === 'Not Found' ? [] : response);