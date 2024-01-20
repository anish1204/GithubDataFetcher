// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();
    // document.getElementsByClassName('UserProfile')

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    requestUserData(gitHubUsername)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let userName = data.name;
            let userBio = data.bio;
            let userLoc = data.location;
            let userGitHubUrl = data.url;
            let twitterHandle = data.twitter_username;
            const imageUrl = data.avatar_url;
            // console.log(imageUrl);
            displayImage(imageUrl, userName, userBio, userLoc, userGitHubUrl, twitterHandle);

        })





    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername)
        // resolve promise then parse response into json
        .then(response => response.json())
        // resolve promise then iterate through json
        .then(data => {
            console.log(data);
            
            var productData =[];
            let itemsPerPage = 10;
            let currentPage = 1;


            async function dataTable() {
                // await productData();
                // console.log(productData);

                const pages = [];
                for(let i=0;i<=Math.ceil(data.length / itemsPerPage);i++)
                {
                    pages.push(i);
                }

                const indexOfLastPages = currentPage * itemsPerPage;
                const indexOfFirstPage = indexOfLastPages - itemsPerPage;
                const currentItems = data.slice(indexOfFirstPage,indexOfLastPages);
                //render pages according to pagination



                document.getElementById("product_container").innerHTML = currentItems.map(Pdata =>
                    `   <div class="card" style="width: 18rem;">
                            <div class="card-body">
                            <h5 class="card-title">${Pdata.name}</h5>
                            <p class="card-text">${Pdata.description}</p>
                            <a href="${Pdata.git_url}" class="btn btn-primary">Link</a>
                            </div>
                        </div>
                    `
                ).join("");
            }
            dataTable();


            const prevBtn = () =>{
                if((currentPage-1)*itemsPerPage)
                {
                    currentPage--;
                    dataTable();
                }
            }
            const nextBtn = () =>{
                if((currentPage* itemsPerPage)/data.length)
                {
                    currentPage++;
                    dataTable();
                }
            }
            document.getElementById("prevBtn").addEventListener("click",prevBtn,false);
            document.getElementById("nextBtn").addEventListener("click",nextBtn,false);


            
            
        })
})


function displayImage(imageUrl, userName, userBio, userLoc, userGitHubUrl, twitterHandle) {
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
    UserBio.innerHTML = userBio;
    UserName.innerHTML = userName;
    UserLocation.innerHTML = userLoc;
    TwitterHandle.innerHTML = twitterHandle;
    GitHubLink.innerHTML = userGitHubUrl;




    // Append the image element to the container
    imageContainer.innerHTML = ''; // Clear previous content

    imageContainer.appendChild(imageElement);


}

// let usernameInput = document.getElementById('usernameInput');

// let gitHubUsername = usernameInput.value;

// var apiUrl = `https://api.github.com/users/${gitHubUsername}/repos`;

//  function repoTable(){
//     const dataL = fetch(apiUrl);
//     const res = dataL.json();
//     console.log('repoTable ' + res);
// }
// repoTable();

function requestUserData(username) {
    return Promise.resolve(fetch(`https://api.github.com/users/${username}`))
}


function requestUserRepos(username) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/users/${username}/repos`));
}