import ModuleManager from './module-manager';
import HostManager from './host-manager';
import Capturing from './capturing';

import style from './App.module.css';

function App() {
    return (
        <div className={style.mainWrapper}>
            <div className={style.moduleWrapper}>
                <ModuleManager />
                <HostManager />
            </div>
            <Capturing />
        </div>
    );
}

export default App;
