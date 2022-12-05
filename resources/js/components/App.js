import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import Unit from '../pages/Units/Unit';
import Product from '../pages/Product/Product';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/unit",
        element: <Unit></Unit>,
    },
    {
        path: "/product",
        element: <Product></Product>,
    },
]);
function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
