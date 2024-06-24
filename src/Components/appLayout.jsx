import { Outlet } from 'react-router-dom';

import Header from './heder';

const AppLayout = () => {
    return (
        <>
          <Header/>
            <main>
                <Outlet />
            </main>
        </>
    )
}
export default AppLayout;