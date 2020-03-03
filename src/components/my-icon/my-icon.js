import './my-icon.scss';
import park from './park.svg'
import school from './school.svg'
import shop from './shop.svg'
import sport from './sport.svg'
import hospital from './hospital.svg'
import kinder from './kinder.svg'
import kadorr from './kadorgroup.svg'
import clock from './clock.svg'
import pinA from './pin_A.svg'

const MyIcon = (label) => {

    const swtichIcon = (label) => {
        switch (label) {
            case 'park': return park;
            case 'school': return school;
            case 'shop': return shop;
            case 'sport': return sport;
            case 'hospital': return hospital;
            case 'kinder': return kinder;
            case 'kadorr': return kadorr;
            case 'clock': return clock;
            case 'pina': return pinA;
        }
    };


    return (
       swtichIcon(label)
    );
};
export default MyIcon;