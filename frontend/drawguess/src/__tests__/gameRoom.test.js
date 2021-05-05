import { shallow } from 'enzyme';
import GameRoom from '../components/gameRoom';

it('renders the game page component', () => {

    const wrapper = shallow(<GameRoom />);

    const name = <h5 className="title">Test room</h5>;
    const room = [ 
        {   
            roomID: 0,
            roomName: "room1",
    }]

    expect(wrapper).toContainReact(name);
    // expect(wrapper).toContainExactlyOneMatchingElement('Sidebar');
    // expect(wrapper).toContainExactlyOneMatchingElement('Main');

});