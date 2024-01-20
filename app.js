// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();
    document.getElementsByClassName('UserProfile')
    
    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    requestUserData(gitHubUsername)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let userName = data.name;
            let userBio = data.bio;
            let userLoc = data.location;
            let userGitHubUrl = data.url;
            let twitterHandle = data.twitter_username;
            const imageUrl = data.avatar_url;
           // console.log(imageUrl);
            displayImage(imageUrl,userName,userBio,userLoc,userGitHubUrl,twitterHandle);

        })



    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername)
        // resolve promise then parse response into json
        .then(response => response.json())
        // resolve promise then iterate through json
        .then(data => {
            console.log(data);

            // update html with data from github
            for (let i in data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {
                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')
                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${gitHubUsername}</p>`);
                    // Append each li to the ul
                    ul.appendChild(li);
                } else {

                    let ul = document.getElementById('userRepos');

                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong></strong> ${data[i].name}</p>
                <p><strong></strong> ${data[i].description}</p>
                <button><p><strong></strong> <a href="${data[i].html_url}">Check Here</a></p> </button> 
            `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})


function displayImage(imageUrl,userName,userBio,userLoc,userGitHubUrl,twitterHandle) {
    // Create an element and target it in the app.html file
    const imageContainer = document.getElementById('imageContainer');
    const UserName = document.getElementById('UserName');
    const UserBio = document.getElementById('UserBio');
    const UserLocation = document.getElementById('UserLocation');
    const TwitterHandle = document.getElementById('TwitterHandle');
    const GitHubLink = document.getElementById('GitHubLink');

    //const 
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    UserBio.innerHTML=userBio;
    UserName.innerHTML=userName;
    UserLocation.innerHTML=userLoc;
    TwitterHandle.innerHTML=twitterHandle;
    GitHubLink.innerHTML=userGitHubUrl;




    // Append the image element to the container
    imageContainer.innerHTML = ''; // Clear previous content
    
    imageContainer.appendChild(imageElement);
    

}


function requestUserData(username) {
    return Promise.resolve(fetch(`https://api.github.com/users/${username}`))
}


function requestUserRepos(username) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}