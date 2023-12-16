document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const searchInput = document.getElementById('search').value;
      const url = `https://api.github.com/search/users?q=${searchInput}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          userList.innerHTML = '';
          data.items.forEach(user => {
            const userItem = document.createElement('li');
            const username = document.createElement('h3');
            const avatar = document.createElement('img');
            const profileLink = document.createElement('a');
  
            username.textContent = user.login;
            avatar.src = user.avatar_url;
            avatar.alt = `Avatar for ${user.login}`;
            profileLink.href = user.html_url;
            profileLink.textContent = 'Profile';
  
            userItem.appendChild(username);
            userItem.appendChild(avatar);
            userItem.appendChild(profileLink);
  
            userItem.addEventListener('click', () => {
              fetch(`https://api.github.com/users/${user.login}/repos`)
                .then(response => response.json())
                .then(reposData => {
                  reposList.innerHTML = '';
                  reposData.forEach(repo => {
                    const repoItem = document.createElement('li');
                    const repoLink = document.createElement('a');
                    repoLink.href = repo.html_url;
                    repoLink.textContent = repo.name;
                    repoItem.appendChild(repoLink);
                    reposList.appendChild(repoItem);
                  });
                })
                .catch(error => console.log(error));
            });
  
            userList.appendChild(userItem);
          });
        })
        .catch(error => console.log(error));
    });
  });