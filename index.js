document.addEventListener('DOMContentLoaded',function(){
    const searchButton=document.getElementById('search-btn');
    const userinput=document.getElementById('username-ipt');
    const statsContainer=document.querySelector('.stats-section');
    const easyProgresscircle=document.querySelector('.easy-progress');
    const mediumProgresscircle=document.querySelector('.medium-progress');
    const hardProgresscircle=document.querySelector('.hard-progress');
    const easyLabel=document.getElementById('easy-label');
    const mediumLabel=document.getElementById('medium-label');
    const hardLabel=document.getElementById('hard-label');
    const cardStatsContainer=document.querySelector('.stats-cards');



    function validateUsername(username){
        if(username.trim()==""){
           alert("Username should not be empty");
           return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
        const isMatching= regex.test(username);
        if(!isMatching){
            alert('Invalid username');
        }
        return isMatching;
         
    }
    
function displayUserData(data) {
    // ✅ Update Labels
    easyLabel.textContent = `Easy: ${data.easySolved}/${data.totalEasy}`;
    mediumLabel.textContent = `Mid: ${data.mediumSolved}/${data.totalMedium}`;
    hardLabel.textContent = `Hard: ${data.hardSolved}/${data.totalHard}`;

    // ✅ Update Circles (using background conic-gradient)
    easyProgresscircle.style.background = `conic-gradient(green ${(data.easySolved / data.totalEasy) * 360}deg, lightgray 0deg)`;
    mediumProgresscircle.style.background = `conic-gradient(orange ${(data.mediumSolved / data.totalMedium) * 360}deg, lightgray 0deg)`;
    hardProgresscircle.style.background = `conic-gradient(red ${(data.hardSolved / data.totalHard) * 360}deg, lightgray 0deg)`;

    // ✅ Update Stats Cards
    cardStatsContainer.innerHTML = `
        <div class="card">
            <h3>Total Solved</h3>
            <p>${data.totalSolved}</p>
        </div>
        <div class="card">
            <h3>Ranking</h3>
            <p>${data.ranking}</p>
        </div>
        <div class="card">
            <h3>Acceptance Rate</h3>
            <p>${data.acceptanceRate.toFixed(2)}%</p>
        </div>
        <div class="card">
            <h3>Contribution Points</h3>
            <p>${data.contributionPoints}</p>
        </div>
    `;
}

    

    async  function fetchUserDetails(username){
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true ;
            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the user details");
            }
            let parsedData=await response.json();
            console.log("Logging Data:",parsedData);

            displayUserData(parsedData);
        }
        catch(err){
            statsContainer.innerHTML=`<p> No data found</p>`;

        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;

        }
        

    }

    searchButton.addEventListener('click',function(){
        const username=userinput.value;
        console.log("The Login Username is :", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })

})