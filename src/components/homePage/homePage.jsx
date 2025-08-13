import { Link } from "react-router-dom";
import GameForm from "../GameForm/GameForm";
import GameList from "../GameList/GameList"



const HomePage = () => {

    const gamesData = [
    {
        _id: '68998f5ec4596ff3498f4018',
        title: '',
        image: 'https://cdn2.unrealengine.com/egs-easportsfc25showcase-eacanada-demo-g1a-00-1920x1080-5130213edd40.jpg',
    },
    
    {
        _id: '689cc6b3721f7d6b6b4ca3b7',
        title: '',
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg?t=1720558643',
    },

    {
        _id: '689cc7cd721f7d6b6b4ca3bf',
        title: '',
        image: 'https://img.game8.co/3817639/2c2266f2a4531fb298a5fcc02c996e78.png/show',
    },

    {
        _id: '689cc8c3721f7d6b6b4ca3c1',
        title: '',
        image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/860510/header.jpg?t=1730127763',
    },
    
    {
        _id: '689cc951721f7d6b6b4ca3c3',
        title: '',
        image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546',
    },

    {
        _id: '689cca7a721f7d6b6b4ca3c5',
        title: '',
        image: 'https://img.tapimg.net/market/images/8c14ddd6e0d37225156d6574947f6fa7.png?imageView2/2/w/720/h/720/q/80/format/jpg/interlace/1/ignore-error/1&t=1',
    },
    {
        _id: '689cccd9721f7d6b6b4ca3c9',
        title: '',
        image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1RLdppgLllgGZlkjuvHBu6/abbcf1e12935e4654a109324955a5087/RED_KEYART_STD_RGB_WW.jpg',
    },
    {
        _id: '689ccd67721f7d6b6b4ca3cb',
        title: '',
        image: 'https://gamingbolt.com/wp-content/uploads/2023/03/resident-evil-4-remake-1.jpg',
    },

];

const handleButton = () => {
    <GameForm />
}

    return (
        
        <div>
        <div id="home-img">
            <Link to="/games/new"><button id="CreateBtn" onClick={handleButton}>Create Games</button></Link>
        </div>
        <h1 id="chooseGameTitle">Choose Game</h1>
        

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