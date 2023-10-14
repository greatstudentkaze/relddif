import ModuleManager from './module-manager';
import HostManager from './host-manager';
import Capturing from './capturing';

import style from './App.module.scss';

function App() {
    return (
        <div className={style.mainWrapper}>
            <ModuleManager />
            <HostManager />
            <Capturing />
        </div>
    );
}

export default App;
