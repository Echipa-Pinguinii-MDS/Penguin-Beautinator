import React from 'react';
// noinspection ES6CheckImport
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import NavBar from './Universal/NavBar';
import PenguinBeautinator from './PenguinBeautinator/PenguinBeautinator';
import SalonPicker from './SalonPicker/SalonPicker';
import Appointments from './Appointments/Appointments';
import SalonPage from './SalonPage/SalonPage';
import Account from './Account/Account';
import {salonsList} from './Universal/Queries';
import './Universal/App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: {about: 'Despre noi', services: 'Servicii', gallery: 'Galerie', contact: 'Contact'},
            salons: []
        }
    }

    componentDidMount() {
        this.refreshSalons()
    }

    refreshSalons = () => {
        salonsList().then(result =>
            this.setState({
                salons: result
            }))
    }

    render() {
        return (
            <Router className={'App'}>
                <NavBar/>
                <div className={'AppPage'}>
                    <Route exact path={'/'}>
                        <Redirect to={'/desprenoi'}/>
                    </Route>
                    <Route path={'/desprenoi'}> <PenguinBeautinator/> </Route>
                    <Route exact path={'/saloane'}> <SalonPicker salons={this.state.salons}/> </Route>
                    <Route path={'/programari'}> <Appointments/> </Route>
                    <Route path={'/account'}> <Account/> </Route>
                    {this.state.salons.map(salon =>
                        <Route key={salon.id} path={'/' + salon.name + salon.id}>
                            <SalonPage sections={this.state.sections} salon={salon}/>
                        </Route>
                    )}
                </div>
            </Router>
        )
    }
}

export default App;
