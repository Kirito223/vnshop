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
import Customer from '../pages/Customer/Customer';
import Sale from '../pages/Sale/Sale';
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
    {
        path: "/customer",
        element: <Customer></Customer>,
    },
    {
        path: "/sale/:type",
        element: <Sale />
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
