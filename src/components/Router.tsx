import {Route, Routes} from 'react-router';
import {XkcdPage} from "./XkcdPage";
import React from "react";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<XkcdPage/>}/>
        </Routes>
    );
};