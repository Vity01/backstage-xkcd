import React from "react";
import {XkcdComicCard} from "./XkcdComicCard";
import {XkcdComicProps} from "../types";

export const Content = (props: XkcdComicProps) => {
    return (
        <XkcdComicCard {...props}/>
    );
};