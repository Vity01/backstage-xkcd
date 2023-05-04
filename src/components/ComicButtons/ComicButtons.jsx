import React from "react";
import {IconButton} from "@material-ui/core";
import {NavigateBefore, NavigateNext, Shuffle, SkipNext, SkipPrevious} from "@material-ui/icons";

export const LAST_INDEX = -1;
const ComicButtons = ({
                          maxCount,
                          comic,
                          loading,
                          gotoAction,
                          gotoRandom
                      }) => {

    return (
        <span>
            <IconButton
                title="Go to First"
                disabled={loading || comic.num === 1}
                onClick={() => gotoAction(1)}
            >
                <SkipPrevious/>
            </IconButton>
            <IconButton
                title="Go to Previous"
                disabled={loading || comic.num <= 1}
                onClick={() => gotoAction(comic.num - 1)}
            >
                <NavigateBefore/>
            </IconButton>

            <IconButton
                title="Go to Random comic"
                disabled={loading}
                onClick={() => gotoRandom()}
            >
                <Shuffle/>
            </IconButton>

            <IconButton
                title="Go to Next"
                disabled={loading || (comic.num + 1 > maxCount)}
                onClick={() => gotoAction(comic.num + 1)}
            >
                <NavigateNext/>
            </IconButton>
            <IconButton
                title="Go to Last"
                disabled={loading || (comic.num >= maxCount)}
                onClick={() => gotoAction(LAST_INDEX)}
            >
                <SkipNext/>
            </IconButton>
        </span>
    );
};

export default ComicButtons;