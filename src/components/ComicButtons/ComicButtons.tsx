import React from "react";
import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext, Shuffle, SkipNext, SkipPrevious } from "@material-ui/icons";
import { LAST_INDEX } from "../../config";

interface ComicButtonsProps {
    maxCount: number;
    comic: {
        num: number;
    };
    loading: boolean;
    gotoAction: (num: number) => void;
    gotoRandom: () => void;
}

/**
 * Navigation buttons for browsing XKCD comics
 */
const ComicButtons = ({
    maxCount,
    comic,
    loading,
    gotoAction,
    gotoRandom
}: ComicButtonsProps) => {
    return (
        <span>
            <IconButton
                aria-label="Go to first comic"
                title="Go to First"
                disabled={loading || comic.num === 1}
                onClick={() => gotoAction(1)}
            >
                <SkipPrevious />
            </IconButton>
            <IconButton
                aria-label="Go to previous comic"
                title="Go to Previous"
                disabled={loading || comic.num <= 1}
                onClick={() => gotoAction(comic.num - 1)}
            >
                <NavigateBefore />
            </IconButton>

            <IconButton
                aria-label="Go to random comic"
                title="Go to Random comic"
                disabled={loading}
                onClick={() => gotoRandom()}
            >
                <Shuffle />
            </IconButton>

            <IconButton
                aria-label="Go to next comic"
                title="Go to Next"
                disabled={loading || (comic.num + 1 > maxCount)}
                onClick={() => gotoAction(comic.num + 1)}
            >
                <NavigateNext />
            </IconButton>
            <IconButton
                aria-label="Go to last comic"
                title="Go to Last"
                disabled={loading || (comic.num >= maxCount)}
                onClick={() => gotoAction(LAST_INDEX)}
            >
                <SkipNext />
            </IconButton>
        </span>
    );
};

export default ComicButtons;
