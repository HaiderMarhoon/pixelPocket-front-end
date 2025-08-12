import GameList from "../GameList/GameList"


const HomePage = () => {

    const gamesData = [
    {
        _id: '68998f5ec4596ff3498f4018',
        title: 'EA Sport',
        image: 'https://cdn2.unrealengine.com/egs-easportsfc25showcase-eacanada-demo-g1a-00-1920x1080-5130213edd40.jpg',
    },
    
    {
        _id: '68998f5ec4596ff3498f4018',
        title: 'EA Sport',
        image: 'https://cdn2.unrealengine.com/egs-easportsfc25showcase-eacanada-demo-g1a-00-1920x1080-5130213edd40.jpg',
    },

        {
        _id: '68998f5ec4596ff3498f4018',
        title: 'EA Sport',
        image: 'https://cdn2.unrealengine.com/egs-easportsfc25showcase-eacanada-demo-g1a-00-1920x1080-5130213edd40.jpg',
    },

        {
        _id: '68998f5ec4596ff3498f4018',
        title: 'EA Sport',
        image: 'https://cdn2.unrealengine.com/egs-easportsfc25showcase-eacanada-demo-g1a-00-1920x1080-5130213edd40.jpg',
    },
];

    return (
        
        <div>
        <div id="home-img"></div>
        <h1>Choose Game</h1>

        <div id="left-item">
            <GameList games={gamesData} showSearch={false} showTitle={false} />
        </div>

        <div id="right-item">
            <h2>About</h2>
            <p>This website will allow users to browse games and create accounts, while registered users can manage their personal library, search and filter games, view details, and interact through reviews and ratings. It ensures a personalized and secure gaming experience with full account, library, and review management features.</p>
        </div>
        </div>
    )
}

export default HomePage;